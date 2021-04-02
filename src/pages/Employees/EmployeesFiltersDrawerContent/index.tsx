import React, { useMemo } from 'react'

import { Typography } from '@material-ui/core'
import { useQuery } from 'react-query'

import { ReactComponent as Employees } from 'src/assets/svgs/settingSidebar/user_colleague_icon.svg'
import CheckboxField from 'src/components/FilterDrawer/fields/CheckboxField'
import SelectField from 'src/components/FilterDrawer/fields/SelectField'
import SliderField from 'src/components/FilterDrawer/fields/SliderField'
import TextField from 'src/components/FilterDrawer/fields/TextField'
import { useTranslate } from 'src/locale'
import { getDepartments } from 'src/services/firebase/getDepartments'

const EmployeesFiltersDrawerContent: React.FC = () => {
  const translate = useTranslate()
  const { data: departments } = useQuery('departments', getDepartments)
  const departmentOptions = useMemo(() => {
    const currentDepartment =
      departments?.map((it) => ({ label: it.department, value: it.id })) ?? []
    currentDepartment.unshift({ label: 'Select option', value: '' })

    return currentDepartment
  }, [departments])

  return (
    <>
      <div className="styles_container__Fv2l_">
        <Typography
          variant="h6"
          className="text-left drawer_heading font-weight-600"
          gutterBottom
        >
          <Employees fill="currentColor" />
          {translate('employees')}
        </Typography>
      </div>
      <TextField name="employeeName" label="name_of_employee" />
      <SelectField
        label="department_name"
        name="department"
        options={departmentOptions}
      />
      <SliderField name="noTaskAssigned" label="no_of_task_assigned" />
      <CheckboxField name="currentStatus" label="current_status" />
    </>
  )
}

export default EmployeesFiltersDrawerContent
