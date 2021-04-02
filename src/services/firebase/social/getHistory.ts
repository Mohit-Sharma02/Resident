import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type GetHistoryDto = {
  type: string
  postId: string
}

export type HistoryItem = {
  id: string
  action: string
  createdDate: Date
  information: Array<{
    label: string
    value: string
  }>
  initiatedBy: {
    avatar: string
    id: string
    name: string
  }
  type: string
}

export async function getHistory({
  type,
  postId,
}: GetHistoryDto): Promise<HistoryItem[]> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  }
  const response = (await db
    .collection(`/Cities/${user.cityId}/${collectionType}/${postId}/History`)
    .orderBy('created_date')
    .get()) as firebase.firestore.QuerySnapshot<{
    created_date: firebase.firestore.Timestamp
    action: string
    information: Array<{ label: string; value: string }>
    initiated_by: {
      avatar: string
      name: string
      id: string
    }
    type: string
  }>

  return response.docs.map((it) => {
    const data = it.data()

    return {
      id: it.id,
      createdDate: data.created_date.toDate(),
      action: data.action,
      information: data.information,
      initiatedBy: data.initiated_by,
      type: data.type,
    }
  })
}
