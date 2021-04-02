import { TasksType } from 'src/components/Tasks/types'

// import { db } from 'src/config/firebase'
// import { getUserData } from 'src/services/session/getUserData'

type GetTasksDto = {
  filters: TasksFilters
  search?: string
  type: TasksType
}

export type TaskItem = {
  id: string
  title: string
  description: string
  assignedBy: string
  assignedTo: string
  createdOn: string
  status: string
  departament: string
  attachment: string
  dueDate: string
}

type GetTasksResponse = {
  entries: Array<TaskItem>
}

export type FirebaseTaskItem = {
  comment_count: number
  created_date: firebase.firestore.Timestamp
  description: string
  dislikes_count: number
  formatted_address: string
  gps_location: firebase.firestore.GeoPoint
  image: string
  likes_count: number
  privacy: string
  resident?: {
    avatar: string
    id: string
    name: string
  }
  status: string
  type?: {
    icon: string
    label: string
  }
  subtype?: {
    icon: string
    label: string
  }
}

export async function getTasks({
  filters,
  search,
  type,
}: GetTasksDto): Promise<GetTasksResponse> {
  console.log(filters)
  console.log(search)
  console.log(type)
  // const user = await getUserData()
  //
  // const collectionType =
  //   type === TasksType.APPRECIATIONS
  //     ? 'Appreciations'
  //     : type === TasksType.REQUESTS
  //     ? 'Requests'
  //     : type === TasksType.SUGGESTIONS
  //     ? 'Suggestions'
  //     : undefined
  //
  // if (!collectionType) {
  //   throw new Error('Invalid type')
  // }
  //
  // const query = db
  //   .collection('Cities')
  //   .doc(user.cityId)
  //   .collection(collectionType) as firebase.firestore.CollectionReference<
  //   FirebaseTaskItem
  // >
  //
  // const entries = await query.get()

  return {
    entries: Array(80)
      .fill(0)
      .map((it, index) => ({
        id: index.toString(),
        title: `Task ${index}`,
        description: `Lorem ipsum dolor sit amet ${index}`,
        assignedBy: 'Mary Jane',
        assignedTo: 'John Doe',
        createdOn: '12 Oct 2020',
        status: 'Analyzing',
        departament: 'Works & Services',
        attachment: 'File.png',
        dueDate: '12 Oct 2020',
      })),
    // entries: entries.docs.map((it) => {
    //   const data = it.data()
    //
    //   return {
    //     id: it.id,
    //     postTitle: data.description,
    //     createdOn: data.created_date.toDate(),
    //     createdBy: data.resident?.name || '',
    //     location: data.formatted_address,
    //     category: data.type?.label || '',
    //     subCategory: data.subtype?.label || '',
    //     allocatedTo: '',
    //     // status: data.status.current.status,
    //     status: data.status,
    //   }
    // }),
  }
}
