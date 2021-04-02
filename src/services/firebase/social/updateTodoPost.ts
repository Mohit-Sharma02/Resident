import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'
type UpdateTodoPostDto = {
  postId: string
  ToDoID: string
  type: string
  selectEmployee: any
  selectedFile: any
  title: string
  description: string
  assignedTo: string
  dueDate: any
  isArchived: boolean
}

export async function updateTodoPost({
  assignedTo,
  postId,
  title,
  description,
  ToDoID,
  selectEmployee,
  selectedFile,
  isArchived,
  dueDate,
  type,
}: UpdateTodoPostDto): Promise<void> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }
  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  } else if (!postId) {
    throw new Error('Invalid postId')
  }

  const oldData = ((await db
    .doc(`/Cities/${user.cityId}/Todos/${ToDoID}`)
    .get()) as firebase.firestore.DocumentSnapshot<{
    archived_date: firebase.firestore.Timestamp
    assignee: {
      assigned_by: {
        avatar: string
        id: string
        name: string
      }
      assigned_to: {
        avatar: string
        id: string
        name: string
      }
      timestamp: firebase.firestore.Timestamp
    }
    description: string
    due_date: firebase.firestore.Timestamp
    is_archived: boolean
    post_id: string
    post_type: string
    task_number: number
    title: string
    files: any
    status: {
      current: {
        status: string
        timestamp: firebase.firestore.Timestamp
      }
      previous: {
        status: string
        timestamp: firebase.firestore.Timestamp
      }
    }
  }>).data()

  const newData: { [key: string]: unknown } = {}
  if (
    title !== oldData?.title ||
    description !== oldData?.description ||
    assignedTo !== oldData?.assignee.assigned_to.id ||
    dueDate !== oldData?.due_date ||
    selectedFile !== oldData?.files.fileUrl
  ) {
    newData.archived_date = oldData?.archived_date || ''
    newData.title = title
    newData.description = description
    newData.assignee = {
      assigned_by: {
        avatar: user.photoURL,
        id: user.uid,
        name: user.displayName,
      },
      assigned_to: {
        avatar: selectEmployee.avatar,
        id: selectEmployee.id,
        name: selectEmployee.label,
      },
    }
    newData.files = selectedFile
    newData.due_date = dueDate
    newData.post_id = postId
    newData.post_type = type
    newData.is_archived = false
    newData.status = {
      previous: oldData?.status?.current,
      current: {
        status: 'EDITED',
        timestamp: new Date(),
      },
    }
  }

  await db.doc(`/Cities/${user.cityId}/Todos/${ToDoID}`).set(newData, {
    merge: true,
  })
}
