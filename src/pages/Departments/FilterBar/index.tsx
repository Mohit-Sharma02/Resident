import React, { useCallback, useState } from 'react'

import { Fab } from '@material-ui/core'

import { ReactComponent as Filter } from '../../../assets/svgs/filter_black.svg'

type FilterBarProps = {
  onOpenFilters?: () => void
  onChange: (input: string) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ onOpenFilters, onChange }) => {
  const [search, setSearch] = useState<string>('')

  const handleOpenFilters = useCallback(() => {
    onOpenFilters && onOpenFilters()
  }, [onOpenFilters])

  const handleChange = useCallback(
    (value: string) => {
      setSearch(value)
      onChange(value)
    },
    [onChange],
  )

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
