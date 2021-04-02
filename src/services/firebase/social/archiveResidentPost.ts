import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type ArchiveResidentPostDto = {
  postId: string
  type: string
}

export async function archiveResidentPost({
  postId,
  type,
}: ArchiveResidentPostDto): Promise<void> {
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

  await db
    .collection(`/Cities/${user.cityId}/${collectionType}`)
    .doc(postId)
    .set(
      {
        archive_date: new Date(),
        is_archived: true,
      },
      {
        merge: true,
      },
    )
}
