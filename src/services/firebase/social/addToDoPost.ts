import firebase from 'src/config/firebase'
import { getUserData } from 'src/services/session/getUserData'

import { getCollectionName } from './getResidentPost'

type AddToDoPostDto = {
  postId: string
  type: string
  selectEmployee: any
  title: string
  selectedFile: any
  description: string
  assignedTo: string
  dueDate: Date
}

const db = firebase.firestore()
const storage = firebase.storage()

export async function addToDoPost({
  assignedTo,
  postId,
  title,
  description,
  selectedFile,
  selectEmployee,
  dueDate,
  type,
}: AddToDoPostDto): Promise<void> {
  const user = await getUserData()

  if (!user) {
    throw new Error('Invalid user')
  }
  const collectionType = getCollectionName(type)

  if (!collectionType) {
    throw new Error('Invalid type')
  } else if (!postId) {
    throw new Error('Invalid postId')
  }
  const currentDate = new Date()

  await db.collection(`/Cities/${user.cityId}/Todos`).add({
    archived_date: '',
    assignee: {
      assigned_by: {
        avatar: user.photoURL,
        id: user.uid,
        name: user.displayName,
      },
      assigned_to: {
        avatar: selectEmployee.avatar,
        id: selectEmployee.id,
        name: selectEmployee.label,
      },
      timestamp: currentDate,
    },
    description: description,
    due_date: dueDate,
    is_archived: false,
    post_id: postId,
    post_type: type,
    title: title,
    files: selectedFile,
    status: {
      current: {
        status: 'ADDED',
        timestamp: new Date(),
      },
      previous: {},
    },
  })
}

export async function uploadToDoImage(file) {
  const user = await getUserData()
  const imgPath = `/cities/${user.cityId}/todos/${file.name}`
  const fileRef = storage.ref(imgPath)
  await fileRef.put(file)
  const fileURL = await storage.ref(imgPath).getDownloadURL()
  const fileName = fileRef.name
  const ImageData = {
    URL: fileURL,
    Name: fileName,
  }

  return ImageData
}
