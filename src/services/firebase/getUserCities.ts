import { db } from 'src/config/firebase'

type DocumentType = {
  status: string
  timestamp: dateFns
}

export async function getUserCities(uid: string): Promise<DocumentType> {
  const result = (await db
    .collection('Users')
    .doc(uid)
    .collection('CityEmployee')
    .doc('Cities')
    .get()) as firebase.firestore.QueryDocumentSnapshot<DocumentType>

  return result.data()
}
