import React, { useCallback, useRef, useState } from 'react'

import { useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import FilterDrawer from 'src/components/FilterDrawer'
import TasksFiltersContent from 'src/components/Tasks/TasksFiltersContent'
import TasksTable from 'src/components/Tasks/TasksTable'
import TasksTableFilters from 'src/components/Tasks/TasksTableFilters'
import { TasksType } from 'src/components/Tasks/types'
import { getTasks } from 'src/services/firebase/social/getTasks'

const defaultFilterValues: ResidentPostsFilters = {
  status: {
    open: true,
    readByCity: true,
    underConsideration: true,
    promotedToProposal: true,
    willImplement: true,
    willNotImplement: true,
    implemented: true,
  },
  categories: {
    ideasForTheApp: true,
    publicWifi: true,
    publicParksAndSpaces: true,
    publicEvents: true,
    publicTransit: true,
    roads: true,
    wasteCollection: true,
    waterworks: true,
    housing: true,
    animalControl: true,
  },
  dateCreated: {
    filterType: 'any',
  },
  department: '',
  unassignedPosts: false,
  archivedPosts: false,
}

const ResidentPosts: React.FC = () => {
  const [filters, setFilters] = useState<ResidentPostsFilters>()
  const [type, setType] = useState<TasksType>(TasksType.REQUESTS)

  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const { data, isLoading, isFetching } = useQuery(
    ['residentPosts', filters, type],
    ({ queryKey }) =>
      getTasks({
        filters: queryKey[1],
        type: queryKey[2],
      }),
  )

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  return (
    <>
      {/* FILTERS DRAWER */}
      <FilterDrawer
        ref={filterDrawerRef}
        onSubmit={(value) => setFilters(value)}
        defaultValues={defaultFilterValues}
      >
        <TasksFiltersContent type={type} />
      </FilterDrawer>

      <div className="clearfix" />
      {/* UPPER TABLE CONTENT */}
      <TasksTableFilters onChange={setType} onOpenFilters={handleOpenFilters} />
      <div className="divider" />
      <div className="clearfix" />

      {/* TABLE CONTENT */}

      <div className="pt-4 ">
        <TasksTable
          isLoading={isLoading || isFetching}
          data={data?.entries}
          type={type}
        />
      </div>
    </>
  )
}

export default ResidentPosts
