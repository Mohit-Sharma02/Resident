import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type AddInternalNoteDto = {
  note: string
  postId: string
  type: string
}

export async function addInternalNote({
  note,
  postId,
  type,
}: AddInternalNoteDto): Promise<void> {
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

  const currentDate = new Date()

  await db
    .collection(
      `/Cities/${user.cityId}/${collectionType}/${postId}/InternalNotes`,
    )
    .add({
      created_date: currentDate,
      employee: {
        avatar: user.photoURL,
        id: user.uid,
        name: user.displayName,
      },
      tagged_employees: [],
      text: note,
      updated_date: currentDate,
    })
}
