import { ResidentPostsType } from 'src/components/ResidentPosts/types'
import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { FirebaseResidentPostItem, ResidentPostItem } from './getResidentPosts'

export type GetResidentPostDto = {
  postId: string
  type: string
}

export function getCollectionName(type: string): string | undefined {
  const collectionType =
    type === ResidentPostsType.APPRECIATIONS
      ? 'Appreciations'
      : type === ResidentPostsType.REQUESTS
      ? 'Requests'
      : type === ResidentPostsType.SUGGESTIONS
      ? 'Suggestions'
      : undefined

  return collectionType
}

export function parseFirebaseResidentItem(
  data: FirebaseResidentPostItem,
): Omit<ResidentPostItem, 'id'> {
  return {
    archiveDate: data.archive_date?.toDate(),
    assignee: {
      assignedBy: {
        avatar:
          data.assignee && data.assignee.assigned_by
            ? data.assignee.assigned_by.avatar
            : '',
        id:
          data.assignee && data.assignee.assigned_by
            ? data.assignee.assigned_by.id
            : '',
        name:
          data.assignee && data.assignee.assigned_by
            ? data.assignee.assigned_by.name
            : '',
      },
      assignedDate: data?.assignee?.assigned_date?.toDate(),
      department: {
        id:
          data.assignee && data.assignee.department
            ? data.assignee.department.id
            : '',
        name:
          data.assignee && data.assignee.department
            ? data.assignee.department.name
            : '',
      },
    },
    commentCount: data.comment_count || 0,
    createdDate: data?.created_date?.toDate() || new Date(),
    description: data?.description ?? '',
    dislikesCount: data.dislikes_count || 0,
    formattedAddress: data?.formatted_address ?? '',
    gpsLocation: {
      latitude: data.gps_location?.latitude ?? 0,
      longitude: data.gps_location?.longitude ?? 0,
    },
    image: data?.image ?? '',
    internalNotesCount: data.internal_notes_count || 0,
    isArchived: data?.is_archived ?? false,
    lastUpdatedBy: {
      avatar: data.last_updated_by ? data.last_updated_by.avatar : '',
      id: data.last_updated_by ? data.last_updated_by.id : '',
      name: data.last_updated_by ? data.last_updated_by.name : '',
    },
    likesCount: data.likes_count || 0,
    postNumber: data.post_number || 0,
    privacy: data?.privacy ?? '',
    dateRange: {
      from:
        data?.range?.start && data?.range?.start !== ''
          ? data?.range?.start?.toDate()
          : new Date(),
      to:
        data?.range?.end && data?.range?.end !== ''
          ? data?.range?.end?.toDate()
          : new Date(),
    },
    resident: {
      avatar: data.resident?.avatar ?? '',
      id: data.resident?.id ?? '',
      name: data.resident?.name ?? '',
    },
    status: {
      current: {
        status: data?.status?.current?.status ?? '',
        date: data?.status?.current?.timestamp?.toDate() ?? new Date(),
      },
      previous: {
        status: data.status?.previous?.status ?? '',
        date: data?.status?.previous?.timestamp?.toDate() ?? new Date(),
      },
    },
    subtype: {
      icon: data.subtype ? data.subtype.icon : '',
      label: data.subtype ? data.subtype.label : '',
    },
    todosCount: data.todos_count || 0,
    type: {
      icon: data.type?.icon ?? '',
      label: data.type?.label ?? '',
    },
  }
}

export async function getResidentPost({
  postId,
  type,
}: GetResidentPostDto): Promise<ResidentPostItem> {
  const user = await getUserData()

  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  } else if (!postId) {
    throw new Error('Invalid postId')
  }

  const query = db
    .collection('Cities')
    .doc(user.cityId)
    .collection(collectionType)
    .doc(postId) as firebase.firestore.DocumentReference<
    FirebaseResidentPostItem
  >

  const document = await query.get()
  const data = document.data()

  if (!data) {
    throw new Error('Post not found')
  }

  return {
    id: document.id,
    ...parseFirebaseResidentItem(data),
  }
}
