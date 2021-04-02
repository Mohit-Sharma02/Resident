import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import FilterDrawer from 'src/components/FilterDrawer'
import ResidentPostsFiltersContent from 'src/components/ResidentPosts/ResidentPostsFiltersContent'
import ResidentPostsTable from 'src/components/ResidentPosts/ResidentPostsTable'
import ResidentPostsTableFilters from 'src/components/ResidentPosts/ResidentPostsTableFilters'
import {
  ResidentPostsFilters,
  ResidentPostsType,
} from 'src/components/ResidentPosts/types'
import { useTranslate } from 'src/locale'
import { getTypeStatus } from 'src/services/firebase/getTypeStatus'
import { getResidentPosts } from 'src/services/firebase/social/getResidentPosts'

const ResidentPosts: React.FC = () => {
  const primaryColor = { fill: '#1976D2' }
  const [filters, setFilters] = useState<ResidentPostsFilters>()
  const [defaultFilterValues, setDefaultFilterValues] = useState()
  const [type, setType] = useState<ResidentPostsType>(
    ResidentPostsType.REQUESTS,
  )
  const translate = useTranslate()
  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const { data, isLoading, isFetching, refetch } = useQuery(
    ['residentPosts', filters, type],
    ({ queryKey }) =>
      getResidentPosts({
        filters: queryKey[1],
        type: queryKey[2],
      }),
  )

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  const { data: postStatus, isLoading: isLoadingStatus } = useQuery(
    ['postStatus'],
    () => getTypeStatus(),
  )

  useEffect(() => {
    if (postStatus) {
      const defaultFilterValues: any = {
        appreciations_categories: {},
        appreciations_status: {},
        suggestions_categories: {},
        suggestions_status: {},
        requests_categories: {},
        requests_status: {},
        dateCreated: {
          filterType: 'any',
        },
        department: '',
        unassignedPosts: false,
        archivedPosts: false,
      }

      if (
        postStatus.appreciation &&
        postStatus.appreciation.list &&
        postStatus.appreciation.list.length > 0
      ) {
        postStatus.appreciation.list.forEach((item) => {
          defaultFilterValues.appreciations_categories[item.label_name] = true
        })
      }

      if (
        postStatus.appreciation &&
        postStatus.appreciation.statuses &&
        postStatus.appreciation.statuses.length > 0
      ) {
        postStatus.appreciation.statuses.forEach((item) => {
          defaultFilterValues.appreciations_status[item.label_name] = true
        })
      }

      if (
        postStatus.suggestion &&
        postStatus.suggestion.list &&
        postStatus.suggestion.list.length > 0
      ) {
        postStatus.suggestion.list.forEach((item) => {
          defaultFilterValues.suggestions_categories[item.label_name] = true
        })
      }

      if (
        postStatus.suggestion &&
        postStatus.suggestion.statuses &&
        postStatus.suggestion.statuses.length > 0
      ) {
        postStatus.suggestion.statuses.forEach((item) => {
          defaultFilterValues.suggestions_status[item.label_name] = true
        })
      }

      if (
        postStatus.request &&
        postStatus.request.list &&
        postStatus.request.list.length > 0
      ) {
        postStatus.request.list.forEach((item) => {
          defaultFilterValues.requests_categories[item.label_name] = true
        })
      }

      if (
        postStatus.request &&
        postStatus.request.statuses &&
        postStatus.request.statuses.length > 0
      ) {
        postStatus.request.statuses.forEach((item) => {
          defaultFilterValues.requests_status[item.label_name] = true
        })
      }

      setDefaultFilterValues(defaultFilterValues)
    }
  }, [postStatus])

  return (
    <>
      {/* FILTERS DRAWER */}
      {defaultFilterValues && (
        <FilterDrawer
          ref={filterDrawerRef}
          onSubmit={(value) => setFilters(value)}
          defaultValues={defaultFilterValues}
        >
          <ResidentPostsFiltersContent type={type} />
        </FilterDrawer>
      )}

      {/* UPPER TABLE CONTENT */}
      <ResidentPostsTableFilters
        onChange={setType}
        onOpenFilters={handleOpenFilters}
      />
      {/* TABLE CONTENT */}
      <ResidentPostsTable
        isLoading={isLoading || isFetching}
        data={data?.entries}
        type={type}
        forceUdate={() => {
          refetch()
        }}
      />
    </>
  )
}

export default ResidentPosts
