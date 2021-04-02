import React, { useMemo, useState } from 'react'

import { Button, Grid, LinearProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'

import { useTranslate } from 'src/locale'
import { getEmployeeRole } from 'src/services/firebase/social/getEmployeeRole'
import { ToDolists } from 'src/services/firebase/social/getToDolists'

import AddEditTodo from './AddEditTodo'
import TodoDetail from './TodoDetail'
import TodoItem from './TodoItem'

import './styles.scss'

type ToDoTabContentProps = {
  postId: string
  type: string
  items: ToDolists[]
  isLoading?: boolean
}

const ToDoTabContent: React.FC<ToDoTabContentProps> = ({
  postId,
  type,
  items,
  isLoading,
}) => {
  const [isAddToDo, setIsAddToDo] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState({})
  const translate = useTranslate()

  const { data: employeesData } = useQuery('employees', getEmployeeRole)

  const assignedOptions = useMemo(
    () =>
      (employeesData &&
        employeesData.entries?.map((employee, idx) => {
          return {
            label: employee?.first_name + ' ' + employee?.last_name,
            id: employee?.id,
            value: employee?.user_id,
            avatar: employee?.avatar,
          }
        })) ??
      [],
    [employeesData],
  )

  const handleOpenFiles = (file) => {
    window.open(file.URL, '_blank')
  }

  return (
    <>
      {isLoading && <LinearProgress className="mb-4" />}
      {!isAddToDo && isEmpty(selectedTodo) && items.length <= 0 ? (
        <div className="justfy-content-center custom-margin align-items-center">
          <p className="text-center styles_label__Ym_84">
            {translate('add_todo')}
          </p>
          <p className="text-center font-weight-600 text-secondary-text">
            {translate('add_todo_desc')}
          </p>
          <Grid xs={5}>
            <Button
              variant="contained"
              className="mb-4 mt-4 d-flex justfy-content-center align-items-center"
              fullWidth
              color="primary"
              onClick={() => setIsAddToDo(true)}
              // disabled={loading || disabled}
              style={{ height: '50px', left: '70%' }}
            >
              {translate('add_todo_text')}
            </Button>
          </Grid>
        </div>
      ) : (
        !isAddToDo &&
        isEmpty(selectedTodo) && (
          <TodoItem
            items={items}
            handleSelectedTodo={setSelectedTodo}
            handleCloseAddTodo={setIsAddToDo}
          />
        )
      )}
      {!isEmpty(selectedTodo) && !isAddToDo && (
        <TodoDetail
          item={selectedTodo}
          type={type}
          postId={postId}
          handleOpenFiles={handleOpenFiles}
          handleSelectedTodo={setSelectedTodo}
          handleCloseAddTodo={setIsAddToDo}
        />
      )}
      {isAddToDo && (
        <AddEditTodo
          type={type}
          postId={postId}
          item={!isEmpty(selectedTodo) ? selectedTodo : null}
          handleCloseAddTodo={setIsAddToDo}
          handleSelectedTodo={setSelectedTodo}
          handleOpenFiles={handleOpenFiles}
          assignedOptions={assignedOptions}
        />
      )}
    </>
  )
}

export default ToDoTabContent
