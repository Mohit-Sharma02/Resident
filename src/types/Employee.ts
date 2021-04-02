export type Employee = {
  avatar: string
  department: string
  first_name: string
  last_name: string
  role: string
  user_id: string
  id: string
}

export type EmployeeV2 = {
  avatar: string
  department_ids: string[]
  departments: any
  first_name: string
  last_name: string
  role: string
  phone_number: string
  user_id: string
  status: string
}
