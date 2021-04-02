import { map, sortBy } from 'lodash/fp'

import { ResidentPostsType } from 'src/components/ResidentPosts/types'
import { db } from 'src/config/firebase'
import { isAfter, isBefore, sameDay } from 'src/services/filters/getDateFilters'
import { getUserData } from 'src/services/session/getUserData'

import { parseFirebaseResidentItem } from './getResidentPost'

type GetResidentPostsDto = {
  filters: any
  search?: string
  type: ResidentPostsType
}

export type ResidentPostItem = {
  id: string
  archiveDate?: Date
  assignee?: {
    assignedBy: {
      avatar: string
      id: string
      name: string
    }
    assignedDate?: Date
    department: {
      id: string
      name: string
    }
  }
  commentCount: number
  createdDate: any
  description: string
  dislikesCount: number
  formattedAddress: string
  gpsLocation: {
    latitude: number
    longitude: number
  }
  image: string
  internalNotesCount: number
  isArchived: boolean
  lastUpdatedBy: {
    avatar: string
    id: string
    name: string
  }
  likesCount: number
  postNumber: number
  privacy: string
  dateRange: {
    from: Date
    to: Date
  }
  resident: {
    avatar: string
    id: string
    name: string
  }
  status: {
    current: {
      status: string
      date: Date
    }
    previous: {
      status: string
      date: Date
    }
  }
  subtype: {
    icon: string
    label: string
  }
  todosCount: number
  type: {
    icon: string
    label: string
  }
}

type GetResidentPostsResponse = {
  entries: Array<ResidentPostItem>
}

export type FirebaseResidentPostItem = Partial<{
  archive_date: firebase.firestore.Timestamp
  assignee: Partial<{
    assigned_by: {
      avatar: string
      id: string
      name: string
    }
    assigned_date: firebase.firestore.Timestamp
    department: {
      id: string
      name: string
    }
  }>
  comment_count: number
  createdDate: firebase.firestore.Timestamp
  description: string
  dislikes_count: number
  formatted_address: string
  gps_location: firebase.firestore.GeoPoint
  image: string
  internal_notes_count: number
  is_archived: boolean
  last_updated_by: {
    avatar: string
    id: string
    name: string
  }
  likes_count: number
  post_number: number
  privacy: string
  range: {
    end: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
  }
  resident: {
    avatar: string
    id: string
    name: string
  }
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
  subtype: {
    icon: string
    label: string
  }
  todos_count: number
  type: {
    icon: string
    label: string
  }
}>

export async function getResidentPosts({
  filters,
  type,
}: GetResidentPostsDto): Promise<GetResidentPostsResponse> {
  const user = await getUserData()

  const getArray = (current) => {
    Object.keys(current).forEach(function (key) {
      if (current[key] === false) {
        delete current[key]
      }
    })

    return Object.keys(current)
  }

  const collectionType =
    type === ResidentPostsType.APPRECIATIONS
      ? 'Appreciations'
      : type === ResidentPostsType.REQUESTS
      ? 'Requests'
      : type === ResidentPostsType.SUGGESTIONS
      ? 'Suggestions'
      : undefined

  if (!collectionType) {
    throw new Error('Invalid type')
  }

  const query = db
    .collection('Cities')
    .doc(user.cityId)
    .collection(collectionType) as firebase.firestore.CollectionReference<
    FirebaseResidentPostItem
  >

  const entries = await query.get()

  let mappedEntries = map((it) => {
    const data = it.data()

    return {
      id: it.id,
      ...parseFirebaseResidentItem(data),
    }
  }, entries.docs)

  if (
    type === ResidentPostsType.REQUESTS &&
    filters &&
    filters.requests_categories
  ) {
    const requestCategories = getArray(filters?.requests_categories)

    if (filters?.requests_categories) {
      const requestFilterCategories = mappedEntries.filter((it) =>
        requestCategories.includes(it.type.label),
      )

      if (requestFilterCategories.length > 0) {
        mappedEntries = requestFilterCategories
      }
    }

    const requestStatus = getArray(filters?.requests_status)

    if (filters?.requests_status) {
      const requestFilterStatus = mappedEntries.filter((it) =>
        requestStatus.includes(it.status.current.status),
      )
      if (requestFilterStatus.length > 0) {
        mappedEntries = requestFilterStatus
      }
    }
  }

  if (
    type === ResidentPostsType.APPRECIATIONS &&
    filters &&
    filters.appreciations_categories
  ) {
    const appreciationCategories = getArray(filters?.appreciations_categories)

    if (filters?.appreciations_categories) {
      const appreciationFilterCategories = mappedEntries.filter((it) =>
        appreciationCategories.includes(it.type.label),
      )
      if (appreciationFilterCategories.length > 0) {
        mappedEntries = appreciationFilterCategories
      }
    }

    const appreciationStatus = getArray(filters?.appreciations_status)

    if (filters?.appreciations_status) {
      const appreciationFilterStatus = mappedEntries.filter((it) =>
        appreciationStatus.includes(it.status.current.status),
      )
      if (appreciationFilterStatus.length > 0) {
        mappedEntries = appreciationFilterStatus
      }
    }
  }

  if (
    type === ResidentPostsType.SUGGESTIONS &&
    filters &&
    filters.suggestions_categories
  ) {
    const suggestionCategories = getArray(filters?.suggestions_categories)

    if (filters?.suggestions_categories) {
      const suggestionFilterCategories = mappedEntries.filter((it) =>
        suggestionCategories.includes(it.type.label),
      )
      if (suggestionFilterCategories.length > 0) {
        mappedEntries = suggestionFilterCategories
      }
    }

    const suggestionStatus = getArray(filters?.suggestions_status)

    if (filters?.suggestions_status) {
      const suggestionFilterStatus = mappedEntries.filter((it) =>
        suggestionStatus.includes(it.status.current.status),
      )
      if (suggestionFilterStatus.length > 0) {
        mappedEntries = suggestionFilterStatus
      }
    }
  }

  if (
    filters &&
    filters?.dateCreated.date !== '' &&
    filters?.dateCreated.filterType === 'isEqualTo'
  ) {
    mappedEntries = mappedEntries.filter((it) =>
      sameDay(it?.createdDate, filters?.dateCreated.date),
    )
  }

  if (
    filters &&
    filters?.dateCreated.date !== '' &&
    filters?.dateCreated.filterType === 'isBefore'
  ) {
    mappedEntries = mappedEntries.filter((it) =>
      isBefore(it?.createdDate, filters?.dateCreated.date),
    )
  }

  if (
    filters &&
    filters?.dateCreated.date !== '' &&
    filters?.dateCreated.filterType === 'isAfter'
  ) {
    mappedEntries = mappedEntries.filter((it) =>
      isAfter(it?.createdDate, filters?.dateCreated.date),
    )
  }

  if (filters && filters?.department && filters?.department !== '') {
    mappedEntries = mappedEntries.filter(
      (it) => it.assignee?.department?.id === filters.department,
    )
  }

  if (filters && filters?.archivedPosts) {
    mappedEntries = mappedEntries.filter(
      (it) => it.isArchived === filters.archivedPosts,
    )
  }

  if (
    filters &&
    filters?.unassignedPosts &&
    filters?.unassignedPosts === true
  ) {
    mappedEntries = mappedEntries.filter(
      (it) => it?.assignee?.department?.id === '',
    )
  }

  return {
    entries: sortBy((it) => it.postNumber, mappedEntries).reverse(),
  }
}
