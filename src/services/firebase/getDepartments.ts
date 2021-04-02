import { db } from 'src/config/firebase'
import { Department } from 'src/types/Department'

import { getUserData } from '../session/getUserData'

export async function getDepartments(): Promise<Department[]> {
  const user = await getUserData()

  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Departments')
    .get()) as firebase.firestore.QuerySnapshot<Department>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  return entries
}
