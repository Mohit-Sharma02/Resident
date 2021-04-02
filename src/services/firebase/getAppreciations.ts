import { db } from 'src/config/firebase'
import { Appreciation } from 'src/types/firebase/Appreciation'
import { Paginated } from 'src/types/Paginated'

import { getUserData } from '../session/getUserData'

export async function getAppreciations(
  page: number,
  entriesPerPage: number,
): Promise<Paginated<Appreciation>> {
  const user = await getUserData()

  const result = (await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Appreciations')
    .orderBy('created_date')
    .get()) as firebase.firestore.QuerySnapshot<Appreciation>

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
