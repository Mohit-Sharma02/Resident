import { db } from 'src/config/firebase'
import { Employee } from 'src/types/Employee'

import { getUserData } from '../session/getUserData'

export async function getAllEmployees(): Promise<any> {
  const user = await getUserData()

  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Employees')
    .get()) as firebase.firestore.QuerySnapshot<Employee>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  return {
    entries,
  }
}
