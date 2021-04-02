import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type UpdateInternalNoteDto = {
  type: string
  postId: string
  note: string
  noteId: string
}

export async function updateInternalNote({
  type,
  postId,
  note,
  noteId,
}: UpdateInternalNoteDto): Promise<void> {
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
    .set({ text: note, updated_date: new Date() }, { merge: true })
}
