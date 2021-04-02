import React, { useCallback, useMemo, useState } from 'react'

import { Avatar } from '@material-ui/core'
import { FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { useMutation, useQueryClient } from 'react-query'

import { formatDate } from 'src/helpers/formatDate'
import { avatarService } from 'src/services/avatarService'
import { InternalNote } from 'src/services/firebase/social/getInternalNotes'
import { removeInternalNote } from 'src/services/firebase/social/removeInternalNote'
import { getUserData } from 'src/services/session/getUserData'

import EditNoteItem from './EditNoteItem'

type NoteItemProps = {
  className?: string
  item: InternalNote
  postId: string
  type: string
}

const NoteItem: React.FC<NoteItemProps> = ({
  className,
  item,
  postId,
  type,
}) => {
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { mutateAsync: removeMutation } = useMutation(removeInternalNote)

  const userData = useMemo(() => getUserData(), [])

  const handleDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault()
      await removeMutation({ type, postId, noteId: item.id })
      queryClient.refetchQueries(['internalNotes', type, postId])
    },
    [type, postId, item, removeMutation, queryClient],
  )

  const handleEditClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault()
      setIsEditing(true)
    },
    [],
  )

  const handleCancelEditClick = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <div className={className}>
      <div className="d-flex">
        {item?.employee?.avatar && item?.employee?.avatar !== '' ? (
          <Avatar
            alt={item?.employee?.name}
            src={item?.employee?.avatar}
            style={{ width: 60, height: 60 }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: avatarService(item.employee.name[0]),
              color: 'white',
            }}
          >
            {item?.employee?.name[0]}
          </Avatar>
        )}
        <div className="ml-3 w-100">
          <div className="d-flex mb-1 align-items-center">
            <span className="font-weight-bold">{item?.employee?.name}</span>
            <div className="ml-auto d-flex align-items-center">
              {userData.uid === item?.employee?.id && (
                <div className="d-flex align-items-center">
                  <a href="#" className="mr-1" onClick={handleEditClick}>
                    <MdModeEdit />
                  </a>
                  <a href="#" className="mr-1" onClick={handleDeleteClick}>
                    <FaTrash />
                  </a>
                </div>
              )}
              <span className="font-size-sm mt-1">
                {formatDate(item.createdDate)}
              </span>
            </div>
          </div>
          {isEditing ? (
            <EditNoteItem
              postId={postId}
              type={type}
              item={item}
              onCancelEdit={handleCancelEditClick}
            />
          ) : (
            <div className="font-size-sm">
              {item?.note?.target ? item?.note?.target?.value : item?.note}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteItem
