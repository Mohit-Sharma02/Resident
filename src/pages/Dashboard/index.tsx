import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Card, Grid } from '@material-ui/core'
import moment from 'moment'
import { useMutation, useQuery } from 'react-query'
import { useHistory } from 'react-router'

import DashboardSectionHeader from 'src/components/DashboardSectionHeader'
import InviteDepartmentForm, {
  InviteDepartmentFormHandlers,
} from 'src/components/InviteDepartmentForm'
import MonthlyChartCard from 'src/components/MonthlyChartCard'
import PostActivityCards from 'src/components/PostActivityCards'
import UserAdoptionCard from 'src/components/UserAdoptionCards'
import { useTranslate } from 'src/locale'
import {
  getCurrentMonthlyCount,
  getMonthlyCount,
} from 'src/services/firebase/getCurrentMonthlyCount'
import { getPreviousMonthlyCount } from 'src/services/firebase/getPreviousMonthlyCount'
import { getThemeOptions } from 'src/services/firebase/getThemeSettings'
import { getTotalCountStats } from 'src/services/firebase/getTotalCountStats'
import { insertDepartmentInvitation } from 'src/services/firebase/insertDepartmentInvitation'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as Appreciations } from '../../assets/svgs/feature_icon_appreciation.svg'
import { ReactComponent as Requests } from '../../assets/svgs/feature_icon_request.svg'
import { ReactComponent as Suggestions } from '../../assets/svgs/feature_icon_suggestion.svg'
import { ReactComponent as CityEmployee } from '../../assets/svgs/user_colleague_icon.svg'
import { ReactComponent as DM } from '../../assets/svgs/user_deptmanager_icon.svg'
import { ReactComponent as EO } from '../../assets/svgs/user_eo_icon.svg'
import { ReactComponent as UserResident } from '../../assets/svgs/user_resident_icon.svg'

import './styles.scss'

const hourlyActiveResidentOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      startingShape: 'rounded',
      endingShape: 'rounded',
      columnWidth: '60%',
    },
  },
  colors: ['#1976D2'],
  fill: {
    opacity: 1,
  },
  stroke: {
    color: '#1976D2',
    width: 4,
  },
  legend: {
    show: false,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    crosshairs: {
      width: 0,
    },
  },
  yaxis: {
    min: 0,
  },
}

const hourlyActiveResidentSeries = [
  {
    name: 'Residents',
    data: [47, 38, 56, 24, 43, 24, 56, 56, 24, 65],
  },
]

const hourlyActiveEmployeeOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      startingShape: 'rounded',
      endingShape: 'rounded',
      columnWidth: '60%',
    },
  },
  colors: ['#1976D2'],
  fill: {
    opacity: 1,
  },
  stroke: {
    color: '#1976D2',
    width: 4,
  },
  legend: {
    show: false,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    crosshairs: {
      width: 0,
    },
  },
  yaxis: {
    min: 0,
  },
}

const hourlyActiveEmployeeSeries = [
  {
    name: 'Employees',
    data: [38, 43, 24, 56, 43, 24, 56, 35, 56, 65],
  },
]

const Dashboard: React.FC = () => {
  const translate = useTranslate()
  const history = useHistory()
  const inviteDepartmentRef = useRef<InviteDepartmentFormHandlers>(null)
  const color = '#1976D2'
  const fillColor = { fill: color }
  const [user, setUser] = useState<any>(null)
  const [
    monthlyActiveResidentOptions,
    setMonthlyActiveResidentOptions,
  ] = useState<any>(null)
  const [
    monthlyActiveResidentSeries,
    setMonthlyActiveResidentSeries,
  ] = useState<any>(null)

  const { data: totalCountStats } = useQuery(
    'totalCountStats',
    getTotalCountStats,
  )

  const { data: previousMonthlyStats } = useQuery(
    'previousMonthlyCount',
    getPreviousMonthlyCount,
  )

  const { data: currentMonthlyStats } = useQuery(
    'currentMonthlyCount',
    getCurrentMonthlyCount,
  )

  const { data: monthlyCount } = useQuery('monthlyCount', getMonthlyCount)

  getThemeOptions()

  const handleInviteManagerButton = () => {
    history.push('/departments')
  }

  /* Invite Manager */

  const handleInviteEmployeeButton = () => {
    inviteDepartmentRef.current?.toggleOpen('Select Department', 'Employee')
  }
  const { mutateAsync: mutateInviteManager } = useMutation(
    insertDepartmentInvitation,
  )

  const [inviteObj, setInviteObj] = useState({
    role: 'Department Manager',
    department: '',
    city_id: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    timestamp: new Date(),
    expiration: null,
    processed: null,
  })

  const handleChangeInviteManager = useCallback((event) => {
    const { name, value } = event.target

    setInviteObj((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleSubmitInviteManager = useCallback(
    async (formData) => {
      await mutateInviteManager(formData)
      inviteDepartmentRef.current?.toggleOpen('Select Department', 'Employee')
      setInviteObj({
        role: 'Select Department',
        department: '',
        city_id: '',
        phone_number: '+1 ',
        first_name: '',
        last_name: '',
        timestamp: new Date(),
        expiration: null,
        processed: null,
      })
    },
    [mutateInviteManager],
  )

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return JSON.parse(user)
  }

  useEffect(() => {
    const user = getUserData()
    setUser(user)
  }, [])

  useEffect(() => {
    if (monthlyCount) {
      const labels = Array.apply(0, Array(12)).map((_, i) =>
        moment().startOf('month').month(i).format('DD MMM yyyy'),
      )
      const months = Array.apply(0, Array(12)).map((_, i) =>
        moment().startOf('month').month(i).format('MM-yyyy'),
      )

      const residentCount = months.map(
        (it) =>
          monthlyCount.find((item) => it === item.id)?.resident_count || 0,
      )
      const monthlyActiveResidentOptions = {
        stroke: {
          curve: 'smooth',
          width: [0, 4],
        },
        chart: {
          toolbar: {
            show: true,
          },
        },
        colors: ['rgba(33, 150, 243, 0.24)', '#1E88E5'],
        fill: {
          opacity: 1,
        },
        labels: labels,
        xaxis: {
          type: 'datetime',
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          strokeDashArray: '5',
          borderColor: 'rgba(125, 138, 156, 0.3)',
        },
        legend: {
          show: true,
          itemMargin: {
            horizontal: 15,
            vertical: 5,
          },
        },
      }
      const monthlyActiveResidentSeries = [
        {
          name: `${translate('active_users')}`,
          type: 'column',
          data: residentCount,
        },
      ]
      setMonthlyActiveResidentOptions(monthlyActiveResidentOptions)
      setMonthlyActiveResidentSeries(monthlyActiveResidentSeries)
    }
  }, [monthlyCount])

  return (
    <>
      <DashboardSectionHeader
        className={`${
          isMobile() ? 'text-dark pb-2 pl-3' : 'text-head pb-4 pt-3'
        }`}
        text={translate('User_by_type')}
      />

      <Grid container spacing={isMobile() ? 0 : 3}>
        <Grid item md={6} xl={3} sm={6} className="custom_grid">
          <UserAdoptionCard
            count={totalCountStats?.resident_count}
            percent={totalCountStats?.population_percent}
            strokeWidth={8}
            title={translate('Residents')}
            titleIcon={<UserResident style={fillColor} />}
          />
        </Grid>
        <Grid item md={6} xl={3} sm={6} className="custom_grid">
          <UserAdoptionCard
            count={totalCountStats?.electedOfficial_count}
            percent={totalCountStats?.elected_officials_percent}
            strokeWidth={8}
            title={translate('elected_efficials')}
            titleIcon={<EO style={fillColor} />}
            icon="plus"
          />
        </Grid>
        <Grid item md={6} xl={3} sm={6} className="custom_grid">
          <UserAdoptionCard
            showButton={user && user.role === 'ElectedOfficial'}
            count={totalCountStats?.departmentManager_count}
            percent={totalCountStats?.departments_percent}
            strokeWidth={8}
            titleIcon={<DM style={{ fill: 'white' }} />}
            title={translate('city_managers')}
            isInvite={true}
            inviteText={translate('invite_your_managers')}
            handleInviteButton={handleInviteManagerButton}
            inviteColor={{ background: '#E31B0C' }}
            inviteCount={91}
          />
        </Grid>
        <Grid item md={6} xl={3} sm={6} className="custom_grid">
          <UserAdoptionCard
            showButton={user && user.role === 'DepartmentManager'}
            count={totalCountStats?.employees_count}
            percent={totalCountStats?.employees_percent}
            strokeWidth={8}
            titleIcon={<CityEmployee style={fillColor} />}
            title={translate('city_employees')}
            isInvite={true}
            handleInviteButton={handleInviteEmployeeButton}
            inviteText={translate('invite_your_employees')}
            inviteColor={{ background: '#1976D2' }}
            showInvite={true}
          />

          {/* Invite New User */}
          <InviteDepartmentForm
            ref={inviteDepartmentRef}
            handleChangeInviteManager={handleChangeInviteManager}
            handleSubmitInviteManager={handleSubmitInviteManager}
            inviteObj={inviteObj}
            fillColor={fillColor}
            readOnlyDepartment={false}
            readOnlyRole={false}
            role="Employee"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* <Grid item xl={4} md={5} sm={6}>
          <DashboardSectionHeader
            className={`${
              isMobile() ? 'text-dark pb-3 pt-3 pl-3' : 'text-head pb-4'
            }`}
            text={translate('active_users_24_hours')}
          />
          <div className="w-100 align-items-center">
            <div className="align-self-center px-3">
              <div className="pb-3">
                <HourlyChartCard
                  color="#1976D2"
                  amount={34}
                  title={translate('Residents')}
                  titleIcon={<UserResident style={fillColor} />}
                  chartOptions={hourlyActiveResidentOptions}
                  chartSeries={hourlyActiveResidentSeries}
                  chartType="area"
                  chartHeight={200}
                />
              </div>
              <div className="pb-3">
                <HourlyChartCard
                  color="#1976D2"
                  amount={45}
                  title={translate('employees')}
                  titleIcon={<CityEmployee style={fillColor} />}
                  chartOptions={hourlyActiveEmployeeOptions}
                  chartSeries={hourlyActiveEmployeeSeries}
                  chartType="area"
                  chartHeight={200}
                />
              </div>
            </div>
          </div>
        </Grid> */}

        {monthlyCount &&
          monthlyActiveResidentOptions &&
          monthlyActiveResidentSeries && (
            <Grid item xl={12}>
              <DashboardSectionHeader
                className={`${
                  isMobile()
                    ? 'text-dark pb-2 pl-3 pt-3 mt-5'
                    : 'text-head pb-4 mt-5'
                }`}
                text={translate('gaily_growth_sage_month')}
              />
              <Card>
                <MonthlyChartCard
                  title={translate('monthlyactiveresidentusers')}
                  subtitle={translate('communityengagement')}
                  chartOptions={monthlyActiveResidentOptions}
                  chartSeries={monthlyActiveResidentSeries}
                  chartType={'line'}
                  chartHeight={450}
                  buttonLabel={translate('create_report')}
                />
              </Card>
            </Grid>
          )}
      </Grid>
      <br />

      <DashboardSectionHeader
        className={`${isMobile() ? 'text-dark pb-2 pl-3' : 'text-head pb-4'}`}
        text={translate('daypostsbytype')}
      />
      <Grid container spacing={6}>
        <Grid item md={4}>
          <PostActivityCards
            title={translate('requests_title_text')}
            titleIcon={<Requests />}
            bgColor="bg-blue"
            currentCount={currentMonthlyStats?.request_count}
            previousCount={previousMonthlyStats?.request_count}
          />
        </Grid>
        <Grid item md={4}>
          <PostActivityCards
            title={translate('suggestions')}
            titleIcon={<Suggestions />}
            currentCount={currentMonthlyStats?.suggestion_count}
            previousCount={previousMonthlyStats?.suggestion_count}
            bgColor="bg-green"
          />
        </Grid>
        <Grid item md={4}>
          <PostActivityCards
            title={translate('text_appreciations')}
            titleIcon={<Appreciations />}
            currentCount={currentMonthlyStats?.appreciation_count}
            previousCount={previousMonthlyStats?.appreciation_count}
            bgColor="bg-warning"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
