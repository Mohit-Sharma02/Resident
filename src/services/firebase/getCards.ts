import { db } from 'src/config/firebase'

const getUserData = () => {
  const storage: any = window.localStorage
  const user = storage.getItem('user')

  return JSON.parse(user)
}

export async function getCards(): Promise<any> {
  const user = getUserData()
  const queryRef: any = db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Cards')

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot<any>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  entries.sort(function (a, b) {
    return b.created.toDate() - a.created.toDate()
  })

  return entries
}
