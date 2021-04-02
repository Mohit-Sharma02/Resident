import { ResidentPostsType } from 'src/components/ResidentPosts/types'
import { db } from 'src/config/firebase'
import {
  PropsGetWatchers,
  getWatchers,
} from 'src/services/firebase/getWatchers'

import { getUserData } from '../session/getUserData'

export type PropsDestroyWatcher = {
  id?: string
  type?: string
  postId?: string
}

type DestroyWatchersResponse = void

export async function destroyWatchers(
  data: PropsDestroyWatcher,
): Promise<DestroyWatchersResponse> {
  const user = await getUserData()
  const type = data.type
  const id = data.postId

  const collectionType =
    type === ResidentPostsType.APPRECIATIONS
      ? 'Appreciations'
      : type === ResidentPostsType.REQUESTS
      ? 'Requests'
      : type === ResidentPostsType.SUGGESTIONS
      ? 'Suggestions'
      : undefined

  const getProps: PropsGetWatchers = {
    type: type,
    id: id,
  }

  const watchers = await getWatchers(getProps)
  let watcher = []

  if (watchers) {
    watcher = watchers.watcher.filter((it) => it.id !== data.id)
  }

  console.log(
    `Cities/${user.cityId}/${collectionType}/${id}/Citycare`,
    'useeffect',
  )

  await db
    .collection(`Cities/${user.cityId}/${collectionType}/${id}/Citycare`)
    .doc('Details')
    .set({ watcher })
}
