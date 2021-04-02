import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type ArchiveToDoPostDto = {
  postId: string
  toDoID: string
  type: string
}

export async function archiveToDoPost({
  postId,
  toDoID,
  type,
}: ArchiveToDoPostDto): Promise<void> {
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
    .doc(`/Cities/${user.cityId}/Todos/${toDoID}`)
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

  await db
    .collection(`/Cities/${user.cityId}/Todos`)
    .doc(toDoID)
    .set(
      {
        archived_date: new Date(),
        is_archived: true,
        status: {
          previous: oldData?.status?.current,
          current: {
            status: 'ARCHIVED',
            timestamp: new Date(),
          },
        },
      },
      {
        merge: true,
      },
    )
}
