import { TaskItem } from './getTasks'

export type GetTaskDto = {
  postId: string
  type: string
}

export async function getTask({ postId, type }: GetTaskDto): Promise<TaskItem> {
  console.log(type)

  return {
    id: postId.toString(),
    title: `Task ${postId}`,
    description: `Lorem ipsum dolor sit amet ${postId}`,
    assignedBy: 'Mary Jane',
    assignedTo: 'John Doe',
    createdOn: '12 Oct 2020',
    status: 'Analyzing',
    departament: 'Works & Services',
    attachment: 'File.png',
    dueDate: '12 Oct 2020',
  }
}
