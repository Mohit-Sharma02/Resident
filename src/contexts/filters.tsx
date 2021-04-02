import React, { createContext, useContext, useState } from 'react'

export type MapFilter = {
  name: string
  value: boolean
  checked: boolean
}

type LeftSidebarMapViewData = {
  filters: MapFilter[]
  setFilters: (filter: MapFilter[]) => void
}

const LeftSidebarMapViewContext = createContext({} as LeftSidebarMapViewData)

const FiltersProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<MapFilter[]>([
    {
      name: 'residents',
      value: false,
      checked: true,
    },
    {
      name: 'requests',
      value: false,
      checked: true,
    },
    {
      name: 'suggestions',
      value: false,
      checked: true,
    },
    {
      name: 'appreciations',
      value: false,
      checked: true,
    },
  ])

  return (
    <LeftSidebarMapViewContext.Provider value={{ filters, setFilters }}>
      {children}
    </LeftSidebarMapViewContext.Provider>
  )
}

export function useFilters(): LeftSidebarMapViewData {
  const context = useContext(LeftSidebarMapViewContext)

  return context
}

export default FiltersProvider
