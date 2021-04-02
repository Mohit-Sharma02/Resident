import React from 'react'

import { Fab } from '@material-ui/core'

import { ReactComponent as Filter } from 'src/assets/svgs/filter_black.svg'
import ResidentPostsTypeList from 'src/components/ResidentPosts/ResidentPostsTableFilters/ResidentPostsTypeList'
import { ResidentPostsType } from 'src/components/ResidentPosts/types'

type ResidentPostsTableFilters = {
  onChange: (type: ResidentPostsType) => void
  onOpenFilters: () => void
  isSettingPage?: boolean
}

const ResidentPostsTableFilters: React.FC<ResidentPostsTableFilters> = ({
  onChange,
  onOpenFilters,
  isSettingPage,
}) => {
  return (
    <div className="scroll-header d-flex align-items-center">
      <ResidentPostsTypeList onChange={onChange} />

      {!isSettingPage && (
        <div className="ml-auto mt-n4">
          <Fab color="primary" size="small" onClick={onOpenFilters}>
            <Filter style={{ fill: 'currentColor' }} />
          </Fab>
        </div>
      )}
    </div>
  )
}

export default ResidentPostsTableFilters
