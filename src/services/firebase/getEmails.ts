import { db } from 'src/config/firebase'
export async function getEmails(): Promise<any> {
  const result = (await db
    .collection('Templates')
    .get()) as firebase.firestore.QuerySnapshot<any>

  const entries = result.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  }))

  return entries
}
