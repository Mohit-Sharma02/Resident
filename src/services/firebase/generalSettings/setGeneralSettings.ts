import firebase from 'src/config/firebase'

import { getUserData } from '../../session/getUserData'

const db = firebase.firestore()
const storage = firebase.storage()

export async function setGeneralSettings(data) {
  const user = await getUserData()

  const result = await db
    .collection('Cities')
    .doc(user.cityId)
    .collection('Settings')
    .doc('GeneralSettings')
    .update(data)
}

export async function uploadCityAvatar(file) {
  const user = await getUserData()
  const imgPath = `/cities/${user.cityId}/avatar/${file.name}`
  const fileRef = storage.ref(imgPath)
  await fileRef.put(file)
  const fileURL = await storage.ref(imgPath).getDownloadURL()

  return fileURL
}

export async function uploadCityCover(file) {
  const user = await getUserData()
  const imgPath = `/cities/${user.cityId}/cover/${file.name}`
  const fileRef = storage.ref(imgPath)
  await fileRef.put(file)

  const fileURL = await storage.ref(imgPath).getDownloadURL()

  return fileURL
}
