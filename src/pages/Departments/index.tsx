import React, { useCallback, useEffect, useRef, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import FilterDrawer from 'src/components/FilterDrawer'
import InviteDepartmentForm, {
  InviteDepartmentFormHandlers,
} from 'src/components/InviteDepartmentForm'
import TableDepartments from 'src/components/TableDepartments'
import { usePage } from 'src/hooks/usePage'
import { useTranslate } from 'src/locale'
import { getDepartmentById } from 'src/services/firebase/getDepartmentById'
import { getDepartments } from 'src/services/firebase/getDepartments'
import { getEmployees } from 'src/services/firebase/getEmployees'
import { insertDepartmentInvitation } from 'src/services/firebase/insertDepartmentInvitation'
import { updateDepartment } from 'src/services/firebase/updateDepartment'
import { Employee } from 'src/types/Employee'
import { Paginated } from 'src/types/Paginated'

/* ICONS */
import { ReactComponent as DepartmentIcon } from '../../assets/svgs/departments.svg'
import { ReactComponent as AnimalCareControl } from '../../assets/svgs/departments/animal.svg'
import { ReactComponent as BuildingInspections } from '../../assets/svgs/departments/building.svg'
import { ReactComponent as CityServices } from '../../assets/svgs/departments/cityservices.svg'
import { ReactComponent as EmergencyManagement } from '../../assets/svgs/departments/ems.svg'
import { ReactComponent as Finance } from '../../assets/svgs/departments/finance.svg'
import { ReactComponent as Fire } from '../../assets/svgs/departments/fire.svg'
import { ReactComponent as Fleet } from '../../assets/svgs/departments/fleet.svg'
import { ReactComponent as PublicHealth } from '../../assets/svgs/departments/health.svg'
import { ReactComponent as Housing } from '../../assets/svgs/departments/housing.svg'
import { ReactComponent as HumanResources } from '../../assets/svgs/departments/hr.svg'
import { ReactComponent as InnovationandTechnology } from '../../assets/svgs/departments/inn_tech.svg'
import { ReactComponent as OfficeMayor } from '../../assets/svgs/departments/mayor.svg'
import { ReactComponent as ParksRecreation } from '../../assets/svgs/departments/park.svg'
import { ReactComponent as PlanningandDevelopment } from '../../assets/svgs/departments/plan.svg'
import { ReactComponent as PoliceDepartment } from '../../assets/svgs/departments/police.svg'
import { ReactComponent as ProcurementServices } from '../../assets/svgs/departments/procurement_services.svg'
import { ReactComponent as Roads } from '../../assets/svgs/departments/road.svg'
import { ReactComponent as Sanitation } from '../../assets/svgs/departments/sanitation.svg'
import { ReactComponent as Transportation } from '../../assets/svgs/departments/transport.svg'
import { ReactComponent as WaterManagement } from '../../assets/svgs/departments/water.svg'
import DepartmentsFiltersDrawerContent from './DepartmentsFiltersDrawerContent'
import './styles.scss'

const Departments: React.FC = () => {
  const primaryColor = { fill: '#1976D2' }
  const translate = useTranslate()
  const [filters, setFilters] = useState<any>()
  const [search, setSearch] = useState<string>('')
  const filterDrawerRef = useRef<BaseDrawerActions>(null)
  const { page, entriesPerPage } = usePage()

  const inviteDepartmentRef = useRef<InviteDepartmentFormHandlers>(null)

  const defaultFilterValues = {
    noOfEmployees: [5, 50],
    noOfActiveTask: [5, 50],
    noOfCompletedTask: [5, 50],
    departmentName: '',
    unAssignedDepartment: true,
  }

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    refetch: refetchEmployee,
  } = useQuery<Paginated<Employee>, Error>(
    ['employees', 1, entriesPerPage],
    ({ queryKey }) => getEmployees(queryKey[1], queryKey[2]),
  )

  const employeeList: any = employeesData?.entries.map((employee, idx) => {
    return {
      name: employee?.first_name + employee?.last_name,
      id: employee?.id,
      idx,
      avatar: employee?.avatar,
      user_id: employee?.user_id,
    }
  })

  employeeList?.push({
    idx: 'invite',
    name: '',
  })

  const {
    data: departmentData,
    isLoading: isLoadingDepartment,
    refetch: refetchDepartment,
  } = useQuery('departments', getDepartments)

  const {
    mutateAsync: mutateDepartment,
    isLoading: isLoadingMutateDepartment,
  } = useMutation(updateDepartment)

  /* Invite Manager */

  const { mutateAsync: mutateInviteManager } = useMutation(
    insertDepartmentInvitation,
  )

  const [state, setState] = React.useState({
    openNewInviteUser: false,
    openSelectManager: false,
    currentDepartment: '',
    currentDepartmentId: '',
    currentDepartmentIcon: '',
  })

  const {
    data: department,
    isLoading: isLoadingDepartmentById,
    refetch: refetchDepartmentById,
  } = useQuery(
    ['getDepartmentById', state.currentDepartmentId],
    ({ queryKey }) => getDepartmentById(queryKey[1]),
    { enabled: false },
  )

  const [inviteObj, setInviteObj] = React.useState({
    role: 'Department Manager',
    department: '',
    city_id: '',
    phone_number: '+1 ',
    first_name: '',
    last_name: '',
    timestamp: new Date(),
    expiration: null,
    processed: null,
  })

  /* Styles & Icons */
  const color = '#1976D2'
  const fillColor = { fill: color }
  const borderColor = color
  const icons = {
    DepartmentIcon: <DepartmentIcon style={fillColor} />,
    OfficeoftheMayor: <OfficeMayor style={fillColor} />,
    '311CityServices': <CityServices style={fillColor} />,
    AnimalCareandControl: <AnimalCareControl style={fillColor} />,
    BuildingInspections: <BuildingInspections style={fillColor} />,
    PoliceDepartment: <PoliceDepartment style={fillColor} />,
    'EmergencyManagement&Communications': (
      <EmergencyManagement style={fillColor} />
    ),
    Finance: <Finance style={fillColor} />,
    Fire: <Fire style={fillColor} />,
    'Fleet&FacilityManagement': <Fleet style={fillColor} />,
    Housing: <Housing style={fillColor} />,
    HumanResources: <HumanResources style={fillColor} />,
    InnovationandTechnology: <InnovationandTechnology style={fillColor} />,
    PlanningandDevelopment: <PlanningandDevelopment style={fillColor} />,
    PublicHealth: <PublicHealth style={fillColor} />,
    Sanitation: <Sanitation style={fillColor} />,
    Roads: <Roads style={fillColor} />,
    Transportation: <Transportation style={fillColor} />,
    WaterManagement: <WaterManagement style={fillColor} />,
    'Parcs&Recreation': <ParksRecreation style={fillColor} />,
    ProcurementServices: <ProcurementServices style={fillColor} />,
  }
  const useStyles = makeStyles(() => ({
    inputRoot: {
      borderRadius: '8px',
      color,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor,
      },
      '& .MuiInputLabel-root': {
        color: color,
      },
    },
  }))
  const classes = useStyles()

  /* Handle Functions */

  const toggleInviteNewUserDrawer = (department?: string) => {
    setState({
      ...state,
      currentDepartment: department || '',
      currentDepartmentIcon: 'DepartmentIcon',
      openNewInviteUser: !state.openNewInviteUser,
      openSelectManager: false,
    })
    setInviteObj((data) => ({ ...data, department: department || '' }))

    inviteDepartmentRef.current?.toggleOpen(department, inviteObj.role)
  }

  const toggleSelectMangerDrawer = async (id?: any) => {
    setState((prevState) => ({
      ...prevState,
      currentDepartmentId: id,
      openSelectManager: !prevState.openSelectManager,
    }))
  }

  useEffect(() => {
    refetchDepartmentById()
  }, [refetchDepartmentById, state.currentDepartmentId])

  const handleStatusDepartment = useCallback(
    async (event, id) => {
      const { name, checked } = event.target
      setState({
        ...state,
        [name]: checked,
      })
      await mutateDepartment({ data: { is_active: checked }, id }, {})
      setTimeout(() => {
        refetchDepartment()
        refetchDepartmentById()
        refetchEmployee()
      }, 5000)
    },
    [mutateDepartment, refetchDepartment, refetchDepartmentById, state],
  )

  const handleSelectManager = useCallback(
    async (event, value, id) => {
      const reqObj = {
        manager: {
          name: value.name,
          user_id: value.user_id,
          avatar: value.avatar,
        },
      }
      await mutateDepartment({ data: reqObj, id }, {})

      setTimeout(() => {
        refetchDepartment()
        refetchDepartmentById()
        refetchEmployee()
      }, 5000)
    },
    [mutateDepartment, refetchDepartment, refetchDepartmentById],
  )

  const handleChangeInviteManager = useCallback((event) => {
    const { name, value } = event.target

    setInviteObj((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleSubmitInviteManager = useCallback(
    async (formData) => {
      await mutateInviteManager(formData)
      setState({ ...state, openNewInviteUser: false })
      inviteDepartmentRef.current?.close()

      setTimeout(() => {
        refetchDepartment()
        refetchEmployee()
      }, 5000)
    },
    [mutateInviteManager, refetchDepartment, state],
  )

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  return (
    <>
      <FilterDrawer
        onSubmit={(value) => setFilters(value)}
        ref={filterDrawerRef}
        defaultValues={defaultFilterValues}
      >
        <DepartmentsFiltersDrawerContent />
      </FilterDrawer>
      {/* <FilterBar
        onChange={(value) => setSearch(value)}
        onOpenFilters={handleOpenFilters}
      /> */}

      <TableDepartments
        state={{
          page,
          pages: 1,
          isLoadingEmployees,
          isLoadingDepartment,
          isLoadingDepartmentById,
          currentDepartmentId: state.currentDepartmentId,
          openSelectManager: state.openSelectManager,
          isLoadingMutateDepartment,
        }}
        props={{
          classes,
          icons,
          toggleInviteNewUserDrawer,
          handleSelectManager,
          toggleSelectMangerDrawer,
          handleStatusDepartment,
        }}
        data={{
          currentDepartment: department,
          departmentData: departmentData,
          employeeData: employeeList,
        }}
      />

      {/* Invite New User */}
      <InviteDepartmentForm
        ref={inviteDepartmentRef}
        handleChangeInviteManager={handleChangeInviteManager}
        handleSubmitInviteManager={handleSubmitInviteManager}
        inviteObj={inviteObj}
        fillColor={fillColor}
        readOnlyDepartment={true}
        readOnlyRole={true}
        department={department}
        role="DepartmentManager"
      />
    </>
  )
}
export default Departments
