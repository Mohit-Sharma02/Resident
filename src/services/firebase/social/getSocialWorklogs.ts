import { db } from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

export async function getSocialWorklogs({ page, limit, filters }) {
  const user = await getUserData()
  let queryRef: any = db.collection(`/Cities/${user.cityId}/Employees`)

  if (filters?.employeeName) {
    queryRef = queryRef
      .where('first_name', '>=', filters.employeeName.trim())
      .where('first_name', '<=', filters.employeeName.trim() + '\uf8ff')
  }

  const result = (await queryRef.get()) as firebase.firestore.QuerySnapshot
  const entries = result.docs.map((it) => {
    const data = it.data()

    return {
      avatar: data.avatar || undefined,
      name: `${data.first_name} ${data.last_name}`,
      department: data.department,
      status: data.status,
      date: data.date,
    }
  })

  return {
    page,
    totalResults: result.docs.length,
    entries,
  }
}
