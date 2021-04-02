import React from 'react'

import {
  Avatar,
  Grid,
  InputAdornment,
  ListItem,
  TextField,
} from '@material-ui/core'

import { ReactComponent as Avtar } from 'src/assets/svg/icons/profile_personal_icon_black.svg'
import { ReactComponent as ChatIcon } from 'src/assets/svgs/chat_send.svg'
import { TaskItem } from 'src/services/firebase/social/getTasks'
// import '../styles'

type TaskContentProps = {
  data: TaskItem
}

const TaskContent: React.FC<TaskContentProps> = ({ data }) => {
  // const methods = useForm()
  if (data === null || data === undefined) {
    data = {}
  }

  return (
    <>
      {Object.keys(data).length && (
        <>
          {' '}
          <h4 className="pb-5 ">Tasks {data.id}</h4>
          <h2 className="border-bottom drawer_title pb-5">
            {data.description}
          </h2>
          <Grid container spacing={3} className="py-3">
            <Grid item xs={6}>
              <p>Assigned By</p>
              <p>{data.assignedBy}</p>
            </Grid>
            <Grid item xs={6}>
              <p>Status</p>
              <p>{data.status}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <p>Data Created</p>
              <p>{data.createdOn}</p>
            </Grid>
            <Grid item xs={6}>
              <p>Due Date</p>
              <p>{data.dueDate}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} className="border-bottom">
            <Grid item xs={6}>
              <p>Assigned To</p>
              <p>{data.assignedTo}</p>
            </Grid>
            <Grid item xs={6}>
              <p>Department</p>
              <p>{data.departament}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} className="my-3">
              <ListItem className="p-0">
                <Avatar>{data.assignedTo[0]}</Avatar>
                <span className="ml-1">{data.assignedTo}</span>
              </ListItem>
              <p className="ml-5">Lorem ipsum dolor sit amet.</p>
            </Grid>
            <div className="divider" />
            <Grid item xs={12} className="my-3">
              <TextField
                variant="outlined"
                placeholder="Type @ to mention and # to reference. "
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ChatIcon style={{ fill: '#1976D2' }} />
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="end">
                      <Avtar style={{ fill: '#1976D2' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>{' '}
        </>
      )}
    </>
  )
}

export default TaskContent
