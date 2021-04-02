import React from 'react'

import { Badge, Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CustomPopover from 'src/components/PopOver'
import { avatarService } from 'src/services/avatarService'

const StatusWorkLog = ({ state, props, menu }) => {
  const StyledBadge = withStyles({
    badge: {
      backgroundColor: `var(--${state.statusColor})`,
      color: `var(--${state.statusColor})`,
      boxShadow: '0 0 0 2px #fff',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })(Badge)

  return (
    <>
      {state.loading ? (
        <CircularProgress
          variant="indeterminate"
          value={0}
          className="m-3 progress-xs"
          color="secondary"
        />
      ) : (
        <Button
          variant="text"
          onClick={props.handleClickStatusMenu}
          className="ml-2 btn-transition-none text-left ml-2 p-0 bg-transparent d-flex align-items-center"
          disableRipple
        >
          <div className="d-block p-0 avatar-icon-wrapper">
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent=""
              classes={{
                badge: `bg-${state.statusColor} badge-circle border-0`,
              }}
              variant="dot"
            >
              <div className="avatar-icon rounded">
                {state.userPhoto.length > 1 && (
                  <img src={state.userPhoto} alt="..." />
                )}
                {state.userPhoto.length === 1 && (
                  <div
                    className="d-flex align-items-center justify-content-center font-weight-bold"
                    style={{
                      backgroundColor: avatarService(state.userPhoto),
                      color: 'white',
                    }}
                  >
                    {state.userPhoto}
                  </div>
                )}
              </div>
            </StyledBadge>
          </div>

          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold py-2 line-height-1">
              {state.username}
            </div>
            {state.timestamp !== 'Invalid date' && (
              <span className="text-black-50">
                {state.currentStatus} - {state.timestamp}
              </span>
            )}
          </div>
        </Button>
      )}
      <CustomPopover
        open={state.open}
        anchorEl={state.anchorEl}
        handleClick={props.handleChangeStatus}
        handleClose={props.handleCloseStatusMenu}
        title={state.title}
        submenu={menu}
      />
    </>
  )
}

export default StatusWorkLog
