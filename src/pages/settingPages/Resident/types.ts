export enum ResidentType {
  REQUESTS = 'requests',
  SUGGESTIONS = 'suggestions',
  APPRECIATIONS = 'appreciations',
}

export type ResidentFilters = {
  avatar: boolean
  fullName: boolean
  address: boolean
  phoneNumber: boolean
  memberSince: boolean
  noOfPosts: boolean
  noOfFollowers: boolean
  votingEligibility: boolean
  homeAdderess: boolean
  username: boolean
}
