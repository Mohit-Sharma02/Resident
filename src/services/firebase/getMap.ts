import { parse } from 'date-fns'

import { db } from 'src/config/firebase'
import { Map } from 'src/types/Map'

const getUserData = () => {
  const storage: any = window.localStorage
  const user = storage.getItem('user')

  return JSON.parse(user)
}

export type GetMapProps = {
  filters?: {
    postType?: string[]
    postStatus?: string[]
    postCategories?: string[]
    startDate?: string
    endDate?: string
    updateMarkers?: string
  }
}

export async function getMap({ filters }: GetMapProps): Promise<any> {
  const user = getUserData()
  const queryRef: any = db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Map')

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot<Map>

  let entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  if (filters?.postType) {
    entries = entries.filter((it) => filters.postType.includes(it.post_type))
  }

  if (filters?.postStatus) {
    entries = entries.filter(
      (it) =>
        it.post_type === 'Neighbour' ||
        (it.post_type === 'Request' &&
          filters.postStatus.requestsStatus.length === 0) ||
        (it.post_type === 'Appreciation' &&
          filters.postStatus.appreciationStatus.length === 0) ||
        (it.post_type === 'Suggestion' &&
          filters.postStatus.suggestionsStatus.length === 0) ||
        (it.post_type === 'Request' &&
          filters.postStatus.requestsStatus.includes(it?.status)) ||
        (it.post_type === 'Appreciation' &&
          filters.postStatus.appreciationStatus.includes(it?.status)) ||
        (it.post_type === 'Suggestion' &&
          filters.postStatus.suggestionsStatus.includes(it?.status)),
    )
  }

  if (filters?.postCategories) {
    entries = entries.filter(
      (it) =>
        it.post_type === 'Neighbour' ||
        (it.post_type === 'Request' &&
          filters.postCategories.requestsCategories.length === 0) ||
        (it.post_type === 'Appreciation' &&
          filters.postCategories.appreciationCategories.length === 0) ||
        (it.post_type === 'Suggestion' &&
          filters.postCategories.suggestionsCategories.length === 0) ||
        (it.post_type === 'Request' &&
          filters.postCategories.requestsCategories.includes(it.type.label)) ||
        (it.post_type === 'Appreciation' &&
          filters.postCategories.appreciationCategories.includes(
            it.type.label,
          )) ||
        (it.post_type === 'Suggestion' &&
          filters.postCategories.suggestionsCategories.includes(it.type.label)),
    )
  }

  if (filters?.startDate !== '' && filters?.endDate !== '') {
    const startDay = parse(filters.startDate, 'yyyy-MM-dd', new Date())
    const endDay = parse(filters.endDate, 'yyyy-MM-dd', new Date())
    entries = entries.filter(
      (it) =>
        it.created_date.toDate().getTime() >= startDay.getTime() &&
        it.created_date.toDate().getTime() <= endDay.getTime(),
    )
  }

  return entries
}
