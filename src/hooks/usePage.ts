import { useCallback } from 'react'

import { Location } from 'history'
import produce from 'immer'
import { parse, stringify } from 'query-string'
import { useHistory, useLocation } from 'react-router'

type LocationDto = {
  page?: number
  entriesPerPage?: number
}

type PageLocation = {
  page?: string
  entriesPerPage?: string
}

type PageResponse = {
  page: number
  validPage: boolean
  entriesPerPage: number
  validEntriesPerPage: boolean
  getLocation: (data: LocationDto) => Location<PageLocation>
  setLocation: (data: LocationDto) => void
  setPage: (page: number) => void
  setEntriesPerPage: (entriesPerPage: number) => void
}

const DEFAULT_PAGE = 1
const DEFAULT_ENTRIES_PER_PAGE = 10

type UsePageProps = {
  defaultEntriesPerPage?: number
  defaultPage?: number
}

export function usePage({
  defaultEntriesPerPage,
  defaultPage,
}: UsePageProps = {}): PageResponse {
  const location = useLocation<PageLocation>()
  const history = useHistory()

  const {
    page = defaultPage || DEFAULT_PAGE,
    entriesPerPage = defaultEntriesPerPage || DEFAULT_ENTRIES_PER_PAGE,
  } = parse(location.search, {
    parseNumbers: true,
  })

  const parsedPage = page
    ? parseInt(page.toString())
    : defaultPage || DEFAULT_PAGE
  const parsedEntriesPerPage = entriesPerPage
    ? parseInt(entriesPerPage.toString())
    : defaultEntriesPerPage || DEFAULT_ENTRIES_PER_PAGE

  const getLocation = useCallback(
    (data: LocationDto) => {
      return produce(location, (draftLocation) => {
        const search = parse(draftLocation.search)
        for (const prop in data) {
          if (data[prop]) {
            search[prop] = data[prop].toString()
          }
        }

        draftLocation.search = stringify(search)
      })
    },
    [location],
  )

  const setLocation = useCallback(
    (data: LocationDto) => {
      history.push(getLocation(data))
    },
    [history, getLocation],
  )

  const setPage = useCallback(
    (page: number) => {
      setLocation({
        page,
      })
    },
    [setLocation],
  )

  const setEntriesPerPage = useCallback(
    (entriesPerPage: number) => {
      setLocation({
        page: 1,
        entriesPerPage,
      })
    },
    [setLocation],
  )

  return {
    page: parsedPage,
    validPage: parsedPage === page && parsedPage > 0,
    entriesPerPage: parsedEntriesPerPage,
    validEntriesPerPage:
      parsedEntriesPerPage === entriesPerPage && parsedEntriesPerPage > 0,
    getLocation,
    setLocation,
    setPage,
    setEntriesPerPage,
  }
}
