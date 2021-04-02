import { db } from 'src/config/firebase'
import { Employee } from 'src/types/Employee'
import { Paginated } from 'src/types/Paginated'

import { getUserData } from '../session/getUserData'

export async function getEmployees(
  page: number,
  entriesPerPage: number,
): Promise<Paginated<Employee>> {
  const user = await getUserData()

  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Employees')
    .where('role', '==', 'DepartmentManager')
    .get()) as firebase.firestore.QuerySnapshot<Employee>

  const entries = result.docs
    .map((it) => ({
      ...it.data(),
      id: it.id,
    }))
    .slice((page - 1) * entriesPerPage, page * entriesPerPage)

  return {
    entries,
    totalResults: result.docs.length,
    totalPages: Math.ceil(result.docs.length / entriesPerPage),
  }
}
