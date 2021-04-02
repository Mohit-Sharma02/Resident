import { db } from 'src/config/firebase'

import { getUserData } from '../session/getUserData'

export async function getDepartmentById(id: string): Promise<any> {
  const user = await getUserData()

  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Departments')
    .doc(id)
    .get()) as firebase.firestore.QueryDocumentSnapshot<DocumentType>

  return { ...result.data(), id: result.id }
}
