type TasksFilterDateCreated =
  | { filterType: 'any' }
  | {
      filterType: 'isEqualTo'
      date: string
    }
  | {
      filterType: 'isBefore'
      date: string
    }
  | {
      filterType: 'isAfter'
      date: string
    }
  | {
      filterType: 'isBetween'
      startDate: string
      endDate: string
    }

export enum TasksType {
  REQUESTS = 'requests',
  SUGGESTIONS = 'suggestions',
  APPRECIATIONS = 'appreciations',
}

export type TasksFilters = {
  status: {
    open: boolean
    readByCity: boolean
    underConsideration: boolean
    promotedToProposal: boolean
    willImplement: boolean
    willNotImplement: boolean
    implemented: boolean
  }
  categories: {
    ideasForTheApp: boolean
    publicWifi: boolean
    publicParksAndSpaces: boolean
    publicEvents: boolean
    publicTransit: boolean
    roads: boolean
    wasteCollection: boolean
    waterworks: boolean
    housing: boolean
    animalControl: boolean
  }
  dateCreated: TasksFilterDateCreated
  department: string
  unassignedPosts: boolean
  archivedPosts: boolean
}
