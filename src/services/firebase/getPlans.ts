import { db } from 'src/config/firebase'

import { getUserData } from '../session/getUserData'

export async function getPlans(): Promise<any> {
  const user = await getUserData()
  const queryRef: any = db
    .collection('Cities')
    .doc(user.cityId)
    .collection('SubscriptionChanges')

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot<any>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  entries.sort(function (a, b) {
    return b.timestamp.toDate() - a.timestamp.toDate()
  })

  return entries
}
