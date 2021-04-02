// import { endOfDay, parse, startOfDay } from 'date-fns'

import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

export async function getSocialEmployees({ page, limit, filters }) {
  const user = await getUserData()
  let queryRef: any = db.collection(`/Cities/${user.cityId}/Employees`)

  if (filters && filters?.currentStatus === false) {
    queryRef = queryRef.where('status', '!=', 'active')
  }

  if (user?.role === 'Employee' || user?.role === 'DepartmentManager') {
    queryRef = queryRef.where(
      'department_ids',
      'array-contains',
      user?.department,
    )
  } else if (filters && filters?.department && filters?.department !== '') {
    queryRef = queryRef.where(
      'department_ids',
      'array-contains',
      filters?.department,
    )
  }

  if (filters && filters?.employeeName && filters?.employeeName !== '') {
    queryRef = queryRef.where('first_name', '>=', filters?.employeeName)
  }

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot

  const entries = result.docs.map((it) => {
    const data = it.data()

    let department = ''

    if (
      data.department_ids &&
      data.department_ids.length > 0 &&
      data.departments
    ) {
      department = data.departments[data.department_ids[0]]
    }

    return {
      avatar: data.avatar || undefined,
      name: `${data.first_name} ${data.last_name}`,
      phone_number: data.phone_number,
      department: department,
      status: data.status,
      role: data.role,
      department_ids: data.department_ids,
    }
  })

  // if (user?.role === 'Employee' || user?.role === 'DepartmentManager') {
  //   entries = entries.filter(
  //     (it) =>
  //       it?.department_ids &&
  //       it?.department_ids.length > 0 &&
  //       it?.department_ids.includes(user?.department),
  //   )
  // }

  // if (filters && filters?.employeeName && filters?.employeeName !== '') {
  //   entries = entries.filter((it) =>
  //     it.name
  //       .toLocaleLowerCase()
  //       .includes(filters?.employeeName.toLocaleLowerCase()),
  //   )
  // }

  // if (filters && filters?.department && filters?.department !== '') {
  //   entries = entries.filter((it) =>
  //     it.department
  //       .toLocaleLowerCase()
  //       .includes(filters?.department.toLocaleLowerCase()),
  //   )
  // }

  // if (filters && filters?.currentStatus === false) {
  //   entries = entries.filter((it) => it?.status !== 'active')
  // }

  const dataEntries = entries.slice((page - 1) * limit, page * limit)

  return {
    page,
    totalResults: entries.length,
    entries: dataEntries,
  }
}
