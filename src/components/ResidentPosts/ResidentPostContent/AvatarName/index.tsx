import React from 'react'

import { Avatar } from '@material-ui/core'

import { avatarService } from 'src/services/avatarService'

type AvatarName = {
  name: string
  src: string
  date: string
}

const AvatarName: React.FC<AvatarName> = ({ name, src, date }) => {
  return (
    <div className="d-flex align-items-center">
      {src ? (
        <Avatar alt={name} src={src} style={{ width: 60, height: 60 }} />
      ) : (
        <Avatar
          style={{
            backgroundColor: avatarService(name[0]),
            color: 'white',
          }}
        >
          {name[0]}
        </Avatar>
      )}
      <div className="ml-3 d-flex flex-column">
        <span className="font-size-sm font-weight-600 title-color">{name}</span>
        <span
          style={{ fontSize: '10px' }}
          className="font-size-xs text-secondary-text"
        >
          {date}
        </span>
      </div>
    </div>
  )
}

export default AvatarName
