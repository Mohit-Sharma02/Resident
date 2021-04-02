export type Resident = {
  id: string
  name: string
}

export type Subtype = {
  icon: string
  label: string
}

export type Type = {
  icon: string
  label: string
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type Map = {
  avatar: string
  created_date: string
  first_name: string
  gps_location: Coordinates
  last_name: string
  name: string
  post_type: string
  resident: Resident
  subtype: Subtype
  type: Type
  status: string
}
