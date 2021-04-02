import React from 'react'

import CheckboxIconField from 'src/components/FilterDrawer/fields/CheckboxIconField'
import HiddenContent from 'src/components/FilterDrawer/HiddenContent'

import { ReactComponent as LampIcon } from './icons/lamp.svg'

const ResidentPostsStatusFilters: React.FC = () => {
  return (
    <HiddenContent label="Status">
      <CheckboxIconField
        name="status.open"
        label="Open"
        icon={<LampIcon fill="#F44336" />}
      />
      <CheckboxIconField
        name="status.readByCity"
        label="Read by City"
        icon={<LampIcon fill="#FF9800" />}
      />
      <CheckboxIconField
        name="status.underConsideration"
        label="Under Consideration"
        icon={<LampIcon fill="#AF52DE" />}
      />
      <CheckboxIconField
        name="status.promotedToProposal"
        label="Promoted to Proposal"
        icon={<LampIcon fill="#00BCD4" />}
      />
      <CheckboxIconField
        name="status.willImplement"
        label="Will Implement"
        icon={<LampIcon fill="#F472D0" />}
      />
      <CheckboxIconField
        name="status.willNotImplement"
        label="Will Not Implement"
        icon={<LampIcon fill="#8999A4" />}
      />
      <CheckboxIconField
        name="status.implemented"
        label="Implemented"
        icon={<LampIcon fill="#3B873E" />}
      />
    </HiddenContent>
  )
}

export default ResidentPostsStatusFilters
