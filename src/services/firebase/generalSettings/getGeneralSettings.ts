import { db } from 'src/config/firebase'

import { getUserData } from '../../session/getUserData'

export async function getGeneralSettings() {
  const user = await getUserData()

  const result = await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Settings')
    .doc('GeneralSettings')
    .get()

  return result?.data()
}
