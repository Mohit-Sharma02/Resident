import { db } from 'src/config/firebase'
import { EmployeeV2 } from 'src/types/Employee'

export async function getUserDepartment(cityId: string): Promise<any> {
  const result = (await db
    .collection('Cities')
    .doc(cityId)
    .collection('Employees')
    .get()) as firebase.firestore.QuerySnapshot<EmployeeV2>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  return entries
}
