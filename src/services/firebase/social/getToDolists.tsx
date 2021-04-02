import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type getToDolistsDto = {
  type: string
  postId: string
}

export type ToDolists = {
  archived_date: Date
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
    timestamp: Date
  }
  description: string
  due_date: Date
  is_archived: boolean
  post_id: string
  post_type: string
  task_number: number
  title: string
  status: {
    current: {
      status: string
      timestamp: Date
    }
    previous: {
      status: string
      timestamp: Date
    }
  }
}

export async function getToDolists({
  type,
  postId,
}: getToDolistsDto): Promise<ToDolists[]> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  }
  if (postId) {
    const response = (await db
      .collection(`/Cities/${user.cityId}/Todos`)
      .where('post_id', '==', postId)
      .orderBy('task_number', 'desc')
      .get()) as firebase.firestore.QuerySnapshot<{
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
    }>

    return response.docs.map((it) => {
      const data = it.data()

      return {
        id: it.id,
        archived_date: data.archived_date,
        assignee: {
          assigned_by: {
            avatar: data.assignee.assigned_by.avatar,
            id: data.assignee.assigned_by.id,
            name: data.assignee.assigned_by.name,
          },
          assigned_to: {
            avatar: data.assignee.assigned_to.avatar,
            id: data.assignee.assigned_to.id,
            name: data.assignee.assigned_to.name,
          },
          timestamp: data.timestamp,
        },
        description: data.description,
        due_date: data.due_date,
        is_archived: data.is_archived,
        post_id: data.post_id,
        post_type: data.post_type,
        title: data.title,
        taskNumber: data.task_number,
        files: data.files,
      }
    })
  }
}
