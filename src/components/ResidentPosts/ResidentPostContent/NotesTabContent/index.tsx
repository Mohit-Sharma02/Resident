import React from 'react'

import { LinearProgress } from '@material-ui/core'

import { InternalNote } from 'src/services/firebase/social/getInternalNotes'

import AddNote from './AddNote'
import NoteItem from './NoteItem'

type NotesTabContentProps = {
  postId: string
  type: string
  items: InternalNote[]
  isLoading?: boolean
  disabled?: boolean
}

const NotesTabContent: React.FC<NotesTabContentProps> = ({
  postId,
  type,
  items,
  isLoading,
  disabled = false,
}) => {
  return (
    <>
      {isLoading && <LinearProgress className="mb-4" />}
      {items?.map((item) => (
        <NoteItem
          postId={postId}
          type={type}
          className="mb-4"
          key={item.id}
          item={item}
        />
      ))}
      {!disabled && (
        <AddNote postId={postId} type={type} src="https://i.pravatar.cc/80" />
      )}
      <br />
      <br />
    </>
  )
}

export default NotesTabContent
