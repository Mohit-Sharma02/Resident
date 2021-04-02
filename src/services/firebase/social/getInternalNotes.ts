import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type GetInternalNotesDto = {
  type: string
  postId: string
}

export type InternalNote = {
  id: string
  createdDate: Date
  employee: {
    avatar: string
    id: string
    name: string
  }
  taggedEmployees: Array<unknown>
  note: string
  updatedDate: Date
}

export async function getInternalNotes({
  type,
  postId,
}: GetInternalNotesDto): Promise<InternalNote[]> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  }

  const response = (await db
    .collection(
      `/Cities/${user.cityId}/${collectionType}/${postId}/InternalNotes`,
    )
    .orderBy('created_date')
    .get()) as firebase.firestore.QuerySnapshot<{
    created_date: firebase.firestore.Timestamp
    employee: {
      avatar: string
      id: string
      name: string
    }
    tagged_employees: Array<unknown>
    text: string
    updated_date: firebase.firestore.Timestamp
  }>

  return response.docs.map((it) => {
    const data = it.data()

    return {
      id: it.id,
      createdDate: data.created_date.toDate(),
      employee: {
        avatar: data.employee.avatar,
        id: data.employee.id,
        name: data.employee.name,
      },
      note: data.text,
      taggedEmployees: [],
      updatedDate: data.updated_date.toDate(),
    }
  })
}
