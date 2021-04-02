import React from 'react'

import { Typography } from '@material-ui/core'

import { ReactComponent as Departments } from 'src/assets/svgs/departments.svg'
import CheckboxField from 'src/components/FilterDrawer/fields/CheckboxField'
import SliderField from 'src/components/FilterDrawer/fields/SliderField'
import TextField from 'src/components/FilterDrawer/fields/TextField'
import { useTranslate } from 'src/locale'

const DepartmentsFiltersDrawerContent: React.FC = () => {
  const translate = useTranslate()

  return (
    <>
      <div className="styles_container__Fv2l_">
        <Typography
          variant="h6"
          className="text-left drawer_heading font-weight-600"
          gutterBottom
        >
          <Departments fill="currentColor" /> {translate('departments_live')}
        </Typography>
      </div>
      <TextField name="departmentName" label="department_name" />
      <SliderField name="noOfEmployees" label="no_of_employees" />
      <SliderField name="noOfActiveTask" label="no_of_active_tasks" />
      <SliderField name="noOfCompletedTask" label="no_of_completed_tasks" />
      <CheckboxField
        name="unAssignedDepartment"
        label="unassigned_department"
      />
    </>
  )
}

export default DepartmentsFiltersDrawerContent
