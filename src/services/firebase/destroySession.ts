import { db } from 'src/config/firebase'

import { getSessions } from './getSessions'

export async function destroySession(sessionId: string): Promise<any> {
  const storage: any = window.localStorage
  const userData = JSON.parse(storage.getItem('user'))
  await db
    .collection('Users')
    .doc(userData.uid)
    .collection('CityEmployee')
    .doc('My')
    .collection('Sessions')
    .doc(sessionId)
    .delete()

  return []
}

export async function destroyAll(uid: string): Promise<any> {
  const sessions = await getSessions(uid)

  sessions.forEach(async (item) => {
    await destroySession(item.id)
  })

  return []
}
