export type GetResourcesEmployeesDto = {
  page: number
  limit: number
  filters: {
    search?: string
  }
}

export type GetResourcesEmployeesResponse = {
  page: number
  totalResults: number
  entries: Array<{
    id: string
    avatar: string
    name: string
    email: string
    department: string
    taskAssigned: string
    lastLogin: string
  }>
}

export async function getResourcesEmployees({
  page,
  limit,
  filters,
}: GetResourcesEmployeesDto): Promise<GetResourcesEmployeesResponse> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          page,
          totalResults: 120,
          entries: Array(limit)
            .fill(0)
            .map((it, index) => ({
              id: index.toString(),
              avatar: `https://i.pravatar.cc/150?img=${index % 15}`,
              name: 'Valerie Plante',
              email: 'val245@gmail.com',
              department: 'Works & Services',
              taskAssigned: '2',
              lastLogin: '09/09/2020',
            })),
        }),
      1000,
    )
  })
}
