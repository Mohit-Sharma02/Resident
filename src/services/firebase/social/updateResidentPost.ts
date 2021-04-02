import { isEqual } from 'date-fns'

import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'
import { FirebaseResidentPostItem } from './getResidentPosts'

type UpdateResidentPostDto = {
  postId: string
  type: string
  status: string
  assignedTo: {
    id: string
    name: string
  }
  dateRange: {
    from: Date
    to: Date
  }
}

export async function updateResidentPost({
  postId,
  type,
  status,
  assignedTo,
  dateRange,
}: UpdateResidentPostDto): Promise<void> {
  const user = await getUserData()

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  } else if (!postId) {
    throw new Error('Invalid postId')
  }

  const oldData = ((await db
    .doc(`/Cities/${user.cityId}/${collectionType}/${postId}`)
    .get()) as firebase.firestore.DocumentSnapshot<
    FirebaseResidentPostItem
  >).data()

  let updated = false

  const newData: { [key: string]: unknown } = {}

  if (dateRange.from && dateRange.to) {
    if (
      !oldData?.range?.end ||
      !oldData.range?.start ||
      !isEqual(oldData.range.end.toDate(), dateRange.to) ||
      !isEqual(oldData.range.start.toDate(), dateRange.from)
    ) {
      updated = true

      newData.range = {
        start: dateRange.from,
        end: dateRange.to,
      }
    }
  }

  if (oldData?.status?.current.status !== status) {
    updated = true

    newData.status = {
      previous: oldData?.status?.current,
      current: {
        status,
        timestamp: new Date(),
      },
    }
  }

  if (oldData?.assignee?.department?.id !== assignedTo.id) {
    updated = true

    newData.assignee = {
      department: assignedTo,
      assigned_by: {
        avatar: user.photoURL,
        id: user.uid,
        name: user.displayName,
      },
      assigned_date: new Date(),
    }
  }

  if (updated) {
    newData.last_updated_by = {
      avatar: user.photoURL,
      id: user.uid,
      name: user.displayName,
    }
  }

  newData.last_updated = new Date()

  await db
    .doc(`/Cities/${user.cityId}/${collectionType}/${postId}`)
    .set(newData, {
      merge: true,
    })
}
