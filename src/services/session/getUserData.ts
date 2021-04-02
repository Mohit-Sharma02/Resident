export type GetUserDataResponse = {
  cityId: string
  displayName: string
  email: string
  photoURL: string
  refreshToken: string
  token: string
  uid: string
  department: string
  role: string
}

export function getUserData(): GetUserDataResponse {
  const storage: any = window.localStorage
  const user = storage.getItem('user')

  return JSON.parse(user) as GetUserDataResponse
}
