import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type GetCommentProps = {
  type: string
  postId: string
}

export type CommentItem = {
  comment_id: string
  id: string
  name: string
  comment: string
  created_date: Date
  avatar: string
  user_id: string
}

export async function getComments({
  type,
  postId,
}: GetCommentProps): Promise<CommentItem[]> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  }

  const result = (await db
    .collection(`/Cities/${user.cityId}/${collectionType}/${postId}/Comments`)
    .orderBy('created_date', 'desc')
    .get()) as firebase.firestore.QuerySnapshot<CommentItem>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    comment_id: it.id,
  }))

  return entries
}
