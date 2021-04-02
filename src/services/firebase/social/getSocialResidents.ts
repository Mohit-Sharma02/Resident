import moment from 'moment'

import { db } from 'src/config/firebase'
import { DEFAULT_ROWS_PER_PAGE_NUMBER } from 'src/config/table'
import { getUserData } from 'src/services/session/getUserData'

export type GetSocialResidentsFilters = {
  age?: [number, number]
  location?: string
  preferences?: {
    homeAddressHidden: boolean
    showUsername: boolean
  }
  votingEligibility?: boolean
  dateOfRegistration?: any
}

export type GetSocialResidentsDto = {
  filters: GetSocialResidentsFilters
  isPrevious?: boolean
  isNext?: boolean
  item?: any
}

export type GetSocialResidentsResponse = Array<{
  id: string
  avatar?: string
  name: string
  address: string
  phone: string
  memberSince: Date
  numberOfPosts: number
  numberOfFollowers: number
  total: number
  request_count: number
  suggestion_count: number
  appreciation_count: number
  is_elected_official: boolean
  eligible_to_vote: boolean
  home_address_visibility: string
  pref_push_name: string
  username: string
}>

export async function getSocialResidents({
  filters,
  isPrevious,
  isNext,
  item,
}: GetSocialResidentsDto): Promise<any> {
  const user = await getUserData()

  let queryRef: any = db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Residents')
    .orderBy('created_date', 'desc')
    .limit(DEFAULT_ROWS_PER_PAGE_NUMBER)

  if (isPrevious) {
    queryRef = db
      .collection('Cities')
      .doc(user.cityId)
      .collection('Residents')
      .orderBy('created_date', 'desc')
      .endBefore(item.createdDate)
      .limitToLast(DEFAULT_ROWS_PER_PAGE_NUMBER)
  }
  if (isNext) {
    queryRef = db
      .collection('Cities')
      .doc(user.cityId)
      .collection('Residents')
      .orderBy('created_date', 'desc')
      .limit(DEFAULT_ROWS_PER_PAGE_NUMBER)
      .startAfter(item.createdDate)
  }

  if (filters && filters?.location && filters?.location !== '') {
    queryRef = queryRef.where('formatted_address', '>=', filters?.location)
  }

  if (filters && filters?.age) {
    // @todo need to change firestore type from String to Timestamp
  }

  if (
    filters &&
    filters?.dateOfRegistration?.date !== '' &&
    filters?.dateOfRegistration?.filterType === 'isEqualTo'
  ) {
    queryRef = queryRef.where(
      'created_date',
      '>=',
      moment(filters?.dateOfRegistration?.date).toDate(),
    )
    queryRef = queryRef.where(
      'created_date',
      '<=',
      moment(filters?.dateOfRegistration?.date).add('days', 1).toDate(),
    )
  }

  if (
    filters &&
    filters?.dateOfRegistration?.date !== '' &&
    filters?.dateOfRegistration?.filterType === 'isBefore'
  ) {
    queryRef = queryRef.where(
      'created_date',
      '<=',
      moment(filters?.dateOfRegistration?.date).add('days', 1).toDate(),
    )
  }

  if (
    filters &&
    filters?.dateOfRegistration?.date !== '' &&
    filters?.dateOfRegistration?.filterType === 'isAfter'
  ) {
    queryRef = queryRef.where(
      'created_date',
      '>=',
      moment(filters?.dateOfRegistration?.date).toDate(),
    )
  }

  if (filters && filters?.votingEligibility) {
    queryRef = queryRef.where(
      'eligible_to_vote',
      '==',
      filters?.votingEligibility,
    )
  }

  if (filters && filters?.preferences?.showUsername) {
    queryRef = queryRef.where('username', '!=', '')
  }

  if (filters && filters?.preferences?.homeAddressHidden) {
    queryRef = queryRef.where('home_address_visibility', '!=', 'everyone')
  }

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot<
    Partial<{
      avatar: string | null
      created_date: firebase.firestore.Timestamp
      date_of_birth: firebase.firestore.Timestamp
      formatted_address: string
      gps_location: any
      name: string
      is_elected_official: boolean
      eligible_to_vote: boolean
      followers_count?: number
      following_count?: number
      phone: string
      pref_push_name: string
    }>
  >

  const mappedEntries = result.docs.map((it) => {
    const data = it.data()

    const totalPosts = (value) => {
      const request = value.request_count || 0
      const suggestion = value.suggestion_count || 0
      const appreciation = value.appreciation_count || 0

      return request + suggestion + appreciation
    }

    return {
      id: it.id,
      total: totalPosts(data),
      avatar: data.avatar ?? '',
      name: data.name,
      request_count: data.request_count,
      suggestion_count: data.suggestion_count,
      appreciation_count: data.appreciation_count,
      createdDate: data.created_date?.toDate() || new Date(),
      dateOfBirth:
        data.date_of_birth && data.date_of_birth !== ''
          ? data.created_date?.toDate()
          : new Date(),
      address: filters?.preferences?.homeAddressHidden
        ? 'hidden'
        : data.formatted_address ?? '',
      phone: data.phone ?? '',
      memberSince:
        data.created_date && data.created_date !== ''
          ? data.created_date?.toDate()
          : new Date(),
      numberOfPosts: 0,
      numberOfFollowers: data.followers_count || 0,
      isElectedOfficial: data?.is_elected_official ?? false,
      eligible_to_vote: data?.eligible_to_vote ?? false,
      is_elected_official: data?.is_elected_official,
      home_address_visibility: data?.home_address_visibility,
      pref_push_name: data?.pref_push_name,
      username: data?.username,
    }
  })

  // if (
  //   filters &&
  //   filters?.dateOfRegistration?.date !== '' &&
  //   filters?.dateOfRegistration?.filterType === 'isEqualTo'
  // ) {
  //   mappedEntries = mappedEntries.filter((it) =>
  //     sameDay(it?.createdDate, filters?.dateOfRegistration.date),
  //   )
  // }

  // if (
  //   filters &&
  //   filters?.dateOfRegistration?.date !== '' &&
  //   filters?.dateOfRegistration?.filterType === 'isBefore'
  // ) {
  //   mappedEntries = mappedEntries.filter((it) =>
  //     isBefore(it?.createdDate, filters?.dateOfRegistration.date),
  //   )
  // }

  // if (
  //   filters &&
  //   filters?.dateOfRegistration?.date !== '' &&
  //   filters?.dateOfRegistration?.filterType === 'isAfter'
  // ) {
  //   mappedEntries = mappedEntries.filter((it) =>
  //     isAfter(it?.createdDate, filters?.dateOfRegistration.date),
  //   )
  // }

  // if (filters && filters?.age) {
  //   mappedEntries = mappedEntries.filter(
  //     (it) =>
  //       getAge(it.dateOfBirth) >= filters?.age[0] &&
  //       getAge(it.dateOfBirth) <= filters?.age[1],
  //   )
  // }

  // if (filters && filters?.location && filters?.location !== '') {
  //   mappedEntries = mappedEntries.filter((it) =>
  //     it.address
  //       .toLocaleLowerCase()
  //       .includes(filters?.location.toLocaleLowerCase()),
  //   )
  // }

  // if (filters && filters?.votingEligibility) {
  //   mappedEntries = mappedEntries.filter((it) => it.is_elected_official)
  // }

  // if (filters && filters?.preferences?.showUsername) {
  //   mappedEntries = mappedEntries.filter(
  //     (it) => it?.username || it?.username !== '',
  //   )
  // }

  // if (filters && filters?.preferences?.homeAddressHidden) {
  //   mappedEntries = mappedEntries.filter(
  //     (it) => it?.home_address_visibility !== 'everyone',
  //   )
  // }

  return mappedEntries
}
