import React from 'react'

import { Fab } from '@material-ui/core'

import { ReactComponent as Filter } from 'src/assets/svgs/filter_black.svg'
import ResidentPostsTypeList from 'src/components/ResidentPosts/ResidentPostsTableFilters/ResidentPostsTypeList'
import { ResidentPostsType } from 'src/components/ResidentPosts/types'

type ResidentPostsTableFilters = {
  onChange: (type: ResidentPostsType) => void
  onOpenFilters: () => void
}

const ResidentPostsTableFilters: React.FC<ResidentPostsTableFilters> = ({
  onChange,
  onOpenFilters,
}) => {
  return (
    <div className="d-flex align-items-center">
      <ResidentPostsTypeList onChange={onChange} />

      <div className="ml-auto">
        <Fab color="primary" size="small" onClick={onOpenFilters}>
          <Filter style={{ fill: 'currentColor' }} />
        </Fab>
      </div>
    </div>
  )
}

export default ResidentPostsTableFilters
