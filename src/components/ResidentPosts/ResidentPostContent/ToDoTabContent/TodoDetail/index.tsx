import React, { useState } from 'react'

import { Grid, IconButton, LinearProgress } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useMutation, useQueryClient } from 'react-query'

import CustomPopover from 'src/components/PopOver'
import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import { archiveToDoPost } from 'src/services/firebase/social/archiveToDoPost'

import { ReactComponent as ToDoSign } from '../../../../../assets/svg/icons/feature_icon_task.svg'
import AddTodoButton from '../addTodoButton'

type TodoDetailProps = {
  item: any
  postId: string
  type: string
  handleCloseAddTodo: any
  handleSelectedTodo: any
  handleOpenFiles: any
}

const TodoDetail: React.FC<TodoDetailProps> = ({
  item,
  postId,
  type,
  handleSelectedTodo,
  handleCloseAddTodo,
  handleOpenFiles,
}) => {
  const translate = useTranslate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)
  const openToDoMenu = Boolean(anchorEl)
  const queryClient = useQueryClient()
  const handleopenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const { mutateAsync: mutateArchiveTodoPost } = useMutation(archiveToDoPost)

  const toDoMenu = [
    // {
    //   name: 'Reassign',
    //   key: 'Reassign',
    // },
    {
      name: 'Edit',
      key: 'Edit',
    },
    {
      name: 'Archive',
      isDisabled: item.is_archived,
      key: 'Archive',
    },
  ]

  const handleSelectMenu = async (selectedMenu) => {
    if (selectedMenu === 'Edit') {
      handleCloseAddTodo(true)
    }
    if (selectedMenu === 'Archive') {
      setLoading(true)
      await mutateArchiveTodoPost({
        postId,
        type,
        toDoID: item.id,
      })
      queryClient.refetchQueries(['toDolists', type, postId])
      setLoading(false)
      handleCloseAddTodo(false)
      handleSelectedTodo({})
    }
  }

  const handleCloseopenMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {loading && <LinearProgress className="mb-4" />}
      <div className="d-flex align-items-center justify-content-between py-1">
        <div className="todo-item">
          <ToDoSign />
          <p className="mb-0 ml-2">{item.title}</p>
        </div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleopenMenu}
        >
          <MoreHorizIcon />
        </IconButton>
        <CustomPopover
          open={openToDoMenu}
          anchorEl={anchorEl}
          handleClick={handleSelectMenu}
          handleClose={handleCloseopenMenu}
          title={null}
          submenu={toDoMenu}
        />
      </div>
      <Grid container>
        <Grid item xs={3}>
          <p className="text-secondary-text">{translate('description')}</p>
        </Grid>
        <Grid item xs={9}>
          <p>{item.description}</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <p className="text-secondary-text">{translate('created_by')}</p>
        </Grid>
        <Grid item xs={9}>
          <p>{item.assignee.assigned_by.name}</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <p className="text-secondary-text">{translate('assigned_to')}</p>
        </Grid>
        <Grid item xs={9}>
          <p>{item.assignee.assigned_to.name}</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <p className="text-secondary-text">{translate('due_date')}</p>
        </Grid>
        <Grid item xs={9}>
          <p>{item.due_date}</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <p className="text-secondary-text">{translate('attached_files')}</p>
        </Grid>
        <Grid item xs={9}>
          <List dense>
            {item.files &&
              item.files.length > 0 &&
              item.files.map((file, index) => (
                <ListItem
                  onClick={() => handleOpenFiles(file)}
                  key={index}
                  button
                >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor: avatarService(file.Name[0]),
                        color: 'white',
                      }}
                      alt={file.Name[0]}
                      src={file.URL}
                    />
                  </ListItemAvatar>
                  <ListItemText id={file.Name} primary={file.Name} />
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
      <AddTodoButton
        handleSelectedTodo={handleSelectedTodo}
        handleCloseAddTodo={handleCloseAddTodo}
      />
    </>
  )
}

export default TodoDetail
