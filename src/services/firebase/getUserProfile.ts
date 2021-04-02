import { db } from 'src/config/firebase'

type DocumentType = {
  status: string
  timestamp: dateFns
}

export async function getUserProfile(uid: string): Promise<DocumentType> {
  const result = (await db
    .collection('Users')
    .doc(uid)
    .collection('CityEmployee')
    .doc('Profile')
    .get()) as firebase.firestore.QueryDocumentSnapshot<DocumentType>

  return result.data()
}
