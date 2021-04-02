import React, { useEffect, useState } from 'react'

import { Card, Container, Grid } from '@material-ui/core'
import moment from 'moment'
import { useQuery } from 'react-query'

import DashboardSectionHeader from 'src/components/DashboardSectionHeader'
import InviteElectedOfficialForm from 'src/components/InviteElectedOfficialForm'
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
  labels: [
    '01 Aug 2020',
    '02 Aug 2020',
    '03 Aug 2020',
    '04 Aug 2020',
    '05 Aug 2020',
    '06 Aug 2020',
    '07 Aug 2020',
    '08 Aug 2020',
    '09 Aug 2020',
    '10 Aug 2020',
    '11 Aug 2020',
    '12 Aug 2020',
  ],
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
    name: 'Active Users',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
  },
  {
    name: 'Total Users',
    type: 'line',
    data: [231, 442, 335, 227, 433, 222, 117, 316, 242, 252, 162, 176],
  },
]

const DashboardWebView: React.FC = () => {
  const translate = useTranslate()
  const [openInviteEO, setOpenInviteEO] = useState(false)
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

  const handleInviteEOButton = () => {
    setOpenInviteEO((prevState) => !prevState)
  }

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
      <Container>
        <DashboardSectionHeader
          className="text-dark pb-2 pt-3 pl-3"
          text={translate('User_by_type')}
        />

        <Grid container spacing={isMobile() ? 0 : 3}>
          <Grid item md={6} xl={3} sm={6} className="custom_grid">
            <UserAdoptionCard
              count={totalCountStats?.resident_count}
              percent={totalCountStats?.population_percent}
              strokeWidth={8}
              title={translate('Residents')}
              titleIcon={<UserResident style={{ fill: '#1976D2' }} />}
            />
          </Grid>
          <Grid item md={6} xl={3} sm={6} className="custom_grid">
            <UserAdoptionCard
              count={totalCountStats?.electedOfficial_count}
              percent={totalCountStats?.elected_officials_percent}
              strokeWidth={8}
              title={translate('elected_efficials')}
              titleIcon={<EO style={{ fill: '#1976D2' }} />}
              icon="plus"
              isInvite={true}
              inviteText={translate('invite_your_eo')}
              handleInviteButton={handleInviteEOButton}
              inviteColor={{ background: '#FF9800' }}
              inviteCount={91}
              showButton={false}
            />

            <InviteElectedOfficialForm
              openInviteEO={openInviteEO}
              handleInviteEOButton={handleInviteEOButton}
            />
          </Grid>
          <Grid item md={6} xl={3} sm={6} className="custom_grid">
            <UserAdoptionCard
              count={totalCountStats?.departmentManager_count}
              percent={totalCountStats?.departments_percent}
              strokeWidth={8}
              titleIcon={<DM style={{ fill: 'white' }} />}
              title={translate('city_managers')}
            />
          </Grid>
          <Grid item md={6} xl={3} sm={6} className="custom_grid">
            <UserAdoptionCard
              count={totalCountStats?.employees_count}
              percent={totalCountStats?.employees_percent}
              strokeWidth={8}
              titleIcon={<CityEmployee style={{ fill: '#1976D2' }} />}
              title={translate('city_employees')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {/* <Grid item xl={4} md={5} sm={6}>
            <DashboardSectionHeader
              className="pb-4 text-dark"
              text="Active Users / 24 Hours"
            />
            <div className="w-100 align-items-center">
              <div className="align-self-center px-4">
                <div className="pb-3">
                  <HourlyChartCard
                    color="#1976D2"
                    amount={34}
                    title={'Residents'}
                    titleIcon={<UserResident style={{ fill: '#1976D2' }} />}
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
                    title={'Employees'}
                    titleIcon={<CityEmployee style={{ fill: '#1976D2' }} />}
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
                    isMobile() ? 'pb-2 pl-3 text-dark pt-3' : 'text-head pb-4'
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

        <DashboardSectionHeader
          className="py-4 pl-2 text-dark"
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
      </Container>
    </>
  )
}

export default DashboardWebView
