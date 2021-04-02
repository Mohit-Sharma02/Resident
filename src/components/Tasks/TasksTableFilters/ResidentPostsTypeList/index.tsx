import React, { useCallback, useState } from 'react'

import { List, ListItem } from '@material-ui/core'

import { ResidentPostsType } from 'src/components/ResidentPosts/types'

import { ReactComponent as AppreciationsIcon } from './icons/appreciations.svg'
import { ReactComponent as RequestsIcon } from './icons/requests.svg'
import { ReactComponent as SuggestionsIcon } from './icons/suggestions.svg'

type ResidentPostsTypeListProps = {
  onChange: (type: ResidentPostsType) => void
}

const ResidentPostsTypeList: React.FC<ResidentPostsTypeListProps> = ({
  onChange,
}) => {
  const [type, setType] = useState<ResidentPostsType>(
    ResidentPostsType.REQUESTS,
  )

  const handleClick = useCallback(
    (newType: ResidentPostsType) => {
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
        disableRipple={type !== ResidentPostsType.REQUESTS}
        selected={type === ResidentPostsType.REQUESTS}
        onClick={() => handleClick(ResidentPostsType.REQUESTS)}
      >
        <span className="px-3">
          <RequestsIcon fill="currentColor" /> Requests
        </span>
        <div className="divider" />
      </ListItem>
      <ListItem
        button
        disableRipple={type !== ResidentPostsType.SUGGESTIONS}
        selected={type === ResidentPostsType.SUGGESTIONS}
        onClick={() => handleClick(ResidentPostsType.SUGGESTIONS)}
      >
        <span className="px-3">
          <SuggestionsIcon fill="currentColor" /> Suggestions
        </span>
        <div className="divider" />
      </ListItem>
      <ListItem
        button
        disableRipple={type !== ResidentPostsType.APPRECIATIONS}
        selected={type === ResidentPostsType.APPRECIATIONS}
        onClick={() => handleClick(ResidentPostsType.APPRECIATIONS)}
      >
        <span className="px-3">
          <AppreciationsIcon fill="currentColor" /> Appreciations
        </span>
        <div className="divider" />
      </ListItem>
    </List>
  )
}

export default ResidentPostsTypeList
