export enum ResidentPostsType {
  REQUESTS = 'requests',
  SUGGESTIONS = 'suggestions',
  APPRECIATIONS = 'appreciations',
}

export type ResidentPostsFilters = {
  createdOn: boolean
  department: boolean
  postId: boolean
  createdBy: boolean
  location: boolean
  category: boolean
  subCategory: boolean
  viewPostOnHover: boolean
  status: boolean
  archived: boolean
}
