import React from 'react'

import { Typography } from '@material-ui/core'

import TextField from 'src/components/FilterDrawer/fields/TextField'

import { ReactComponent as AppreciationsIcon } from '../TasksTableFilters/ResidentPostsTypeList/icons/appreciations.svg'
import { ReactComponent as RequestsIcon } from '../TasksTableFilters/ResidentPostsTypeList/icons/requests.svg'
import { ReactComponent as SuggestionsIcon } from '../TasksTableFilters/ResidentPostsTypeList/icons/suggestions.svg'
import { TasksType } from '../types'
import TasksDateCreatedFilters from './TasksDateCreatedFilters'
import TasksStatusFilters from './TasksStatusFilters'

type TasksFiltersContentProps = {
  type: TasksType
}

const TasksFiltersContent: React.FC<TasksFiltersContentProps> = ({ type }) => {
  return (
    <>
      {type === TasksType.REQUESTS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <RequestsIcon fill="currentColor" /> Requests
          </Typography>
        </div>
      )}
      {type === TasksType.SUGGESTIONS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <SuggestionsIcon fill="currentColor" /> Suggestions
          </Typography>
        </div>
      )}
      {type === TasksType.APPRECIATIONS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <AppreciationsIcon fill="currentColor" /> Appreciations
          </Typography>
        </div>
      )}

      <TextField name="assignedBy" label="Assigned By" />
      <TextField name="assignedTo" label="Assigned To" />
      <TextField name="departament" label="Departament" />
      <TasksStatusFilters />
      <TasksDateCreatedFilters />
    </>
  )
}

export default TasksFiltersContent
