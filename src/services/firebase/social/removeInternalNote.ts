import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type RemoveInternalNoteDto = {
  type: string
  postId: string
  noteId: string
}

export async function removeInternalNote({
  type,
  postId,
  noteId,
}: RemoveInternalNoteDto): Promise<void> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  }

  await db
    .collection(
      `/Cities/${user.cityId}/${collectionType}/${postId}/InternalNotes`,
    )
    .doc(noteId)
    .delete()
}
