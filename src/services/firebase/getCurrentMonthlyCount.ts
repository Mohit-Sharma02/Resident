import { db } from 'src/config/firebase'
import currentMonth from 'src/utils/currentMonth'
import currentYear from 'src/utils/currentYear'

type DocumentType = {
  appreciation_count: number
  request_count: number
  suggestion_count: number
}

const getUserData = () => {
  const storage: any = window.localStorage
  const user = storage.getItem('user')

  return JSON.parse(user)
}

export async function getCurrentMonthlyCount(): Promise<DocumentType> {
  const getYearMonth = `${currentMonth() < 10 ? '0' : ''}${
    currentMonth() + 1
  }-${currentYear()}`
  const user = getUserData()
  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Stats')
    .doc('MonthlyCounts')
    .collection('TotalCounts')
    .doc(getYearMonth)
    .get()) as firebase.firestore.QueryDocumentSnapshot<DocumentType>

  return result.data()
}

export async function getMonthlyCount(): Promise<any> {
  const user = getUserData()
  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Stats')
    .doc('MonthlyCounts')
    .collection('TotalCounts')
    .get()) as firebase.firestore.QuerySnapshot<any>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  return entries
}
