import React from 'react'

import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import { useTranslate } from 'src/locale'
import './styles.scss'

type AddTodoButtonProps = {
  handleCloseAddTodo: any
  handleSelectedTodo: any
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({
  handleCloseAddTodo,
  handleSelectedTodo,
}) => {
  const translate = useTranslate()

  return (
    <>
      <div
        onClick={() => {
          handleCloseAddTodo(true)
          handleSelectedTodo({})
        }}
        className="green-button pointer-event"
      >
        <IconButton
          className="add_button"
          aria-label="upload picture"
          component="span"
        >
          <Add />
        </IconButton>
        {translate('add_new_todo')}
      </div>
    </>
  )
}

export default AddTodoButton
