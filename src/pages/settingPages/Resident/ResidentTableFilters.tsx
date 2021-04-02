import React from 'react'

import ResidentTypeList from './ResidentTypeList'
import { ResidentType } from './types'

type ResidentTableFilters = {
  onChange: (type: ResidentType) => void
  onOpenFilters: () => void
  isSettingPage?: boolean
}

const ResidentTableFilters: React.FC<ResidentTableFilters> = ({
  onChange,
  onOpenFilters,
  isSettingPage,
}) => {
  return (
    <div className="d-flex align-items-center">
      <ResidentTypeList onChange={onChange} />
    </div>
  )
}

export default ResidentTableFilters
