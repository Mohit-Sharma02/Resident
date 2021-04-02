import React, { useCallback } from 'react'

import { Fab } from '@material-ui/core'

import { ReactComponent as Filter } from '../../../assets/svgs/filter_black.svg'

type FilterBarProps = {
  onOpenFilters?: () => void
}

const FilterBar: React.FC<FilterBarProps> = ({ onOpenFilters }) => {
  const handleOpenFilters = useCallback(() => {
    onOpenFilters && onOpenFilters()
  }, [onOpenFilters])

  return (
    <div className="d-flex align-items-center mb-4">
      <Fab
        className="ml-auto"
        color="default"
        size="small"
        onClick={handleOpenFilters}
      >
        <Filter style={{ fill: '#1976D2' }} />
      </Fab>
    </div>
  )
}

export default FilterBar
