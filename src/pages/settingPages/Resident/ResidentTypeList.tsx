import React, { useCallback, useState } from 'react'

import { List, ListItem } from '@material-ui/core'

import { ReactComponent as AppreciationsIcon } from './icons/appreciations.svg'
import { ReactComponent as RequestsIcon } from './icons/requests.svg'
import { ReactComponent as SuggestionsIcon } from './icons/suggestions.svg'
import { ResidentType } from './types'

type ResidentTypeListProps = {
  onChange: (type: ResidentType) => void
}

const ResidentTypeList: React.FC<ResidentTypeListProps> = ({ onChange }) => {
  const [type, setType] = useState<ResidentType>(ResidentType.REQUESTS)

  const handleClick = useCallback(
    (newType: ResidentType) => {
      setType(newType)
      onChange(newType)
    },
    [onChange],
  )

  return (
    <List
      component="div"
      className="tabs-animated tabs-animated-line nav-tabs d-flex align-items-center border-bottom"
    >
      <ListItem
        button
        disableRipple={type !== ResidentType.REQUESTS}
        selected={type === ResidentType.REQUESTS}
        onClick={() => handleClick(ResidentType.REQUESTS)}
      >
        <span className="px-3">
          <RequestsIcon fill="currentColor" /> Requests
        </span>
        <div className="divider" />
      </ListItem>
      <ListItem
        button
        disableRipple={type !== ResidentType.SUGGESTIONS}
        selected={type === ResidentType.SUGGESTIONS}
        onClick={() => handleClick(ResidentType.SUGGESTIONS)}
      >
        <span className="px-3">
          <SuggestionsIcon fill="currentColor" /> Suggestions
        </span>
        <div className="divider" />
      </ListItem>
      <ListItem
        button
        disableRipple={type !== ResidentType.APPRECIATIONS}
        selected={type === ResidentType.APPRECIATIONS}
        onClick={() => handleClick(ResidentType.APPRECIATIONS)}
      >
        <span className="px-3">
          <AppreciationsIcon fill="currentColor" /> Appreciations
        </span>
        <div className="divider" />
      </ListItem>
    </List>
  )
}

export default ResidentTypeList
