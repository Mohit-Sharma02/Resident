import React from 'react'

import Avatar from '@material-ui/core/Avatar'

import { avatarService } from 'src/services/avatarService'

import { ReactComponent as ToDoSign } from '../../../../../assets/svg/icons/feature_icon_task.svg'
import AddTodoButton from '../addTodoButton'

type TodoItemProps = {
  items: any
  handleCloseAddTodo: any
  handleSelectedTodo: any
}

const TodoItem: React.FC<TodoItemProps> = ({
  items,
  handleSelectedTodo,
  handleCloseAddTodo,
}) => {
  return (
    <>
      {items &&
        items.length &&
        items.map((toDo: any, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between border-class px-3 mb-3 py-1"
            onClick={() => handleSelectedTodo(toDo)}
          >
            <div className="todo-item">
              <ToDoSign />
              <p className="mb-0 ml-2">{toDo.title}</p>
            </div>
            {toDo.assignee.assigned_to.avatar ? (
              <Avatar
                src={toDo.assignee.assigned_to.avatar}
                style={{ height: '35px', width: '35px' }}
              />
            ) : (
              <Avatar
                style={{
                  height: '35px',
                  width: '35px',
                  backgroundColor: avatarService(
                    toDo.assignee.assigned_to.name[0],
                  ),
                  color: 'white',
                }}
              >
                {toDo.assignee.assigned_to.name[0]}
              </Avatar>
            )}
          </div>
        ))}
      <AddTodoButton
        handleSelectedTodo={handleSelectedTodo}
        handleCloseAddTodo={handleCloseAddTodo}
      />
    </>
  )
}

export default TodoItem
