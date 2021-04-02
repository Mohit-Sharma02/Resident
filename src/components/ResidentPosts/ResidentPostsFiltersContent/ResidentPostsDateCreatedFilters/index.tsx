import React from 'react'

import DateRangeField from 'src/components/FilterDrawer/fields/DateRangeField'
import HiddenContent from 'src/components/FilterDrawer/HiddenContent'

const ResidentPostsDateCreatedFilters: React.FC = () => {
  return (
    <HiddenContent label="date_created">
      <DateRangeField name="dateCreated" />
    </HiddenContent>
  )
}

export default ResidentPostsDateCreatedFilters
