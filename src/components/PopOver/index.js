import React from 'react'
import { useSelector } from 'react-redux'

import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  Popover,
} from '@material-ui/core'
import uuid from 'react-uuid'

import { RootState } from 'src/store/rootReducer'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CustomPopover = ({
  open,
  anchorEl,
  handleClose,
  title,
  submenu,
  handleClick,
  isProfile = false,
}) => {
  const { locale } = useSelector((state: RootState) => state.locale)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader style={{ color: '#1E88E5' }}>
            <small className="font-size-md d-block">{title}</small>
          </ListSubheader>
        }
        className="list-group-flush text-left bg-transparent"
      >
        {submenu &&
          submenu.map((m) => (
            <>
              <ListItem
                disabled={m.isDisabled}
                className="d-block"
                selected={m.key === locale}
              >
                <div
                  style={{ cursor: 'pointer' }}
                  key={uuid()}
                  onClick={() => !m.isDisabled && handleClick(m.key)}
                >
                  {m.isDivider && (
                    <div className="divider-menu">
                      <Divider className="w-100" />
                    </div>
                  )}
                  <div className="align-box-row">
                    {m.icon && <div>{m.icon}</div>}
                    <div
                      className={`${
                        isProfile ? 'line-height-md' : 'pl-3 line-height-md'
                      }`}
                    >
                      <span
                        aria-disabled={m.isDisabled}
                        className={`${
                          m.isDivider
                            ? 'text-primary d-block'
                            : 'text-black d-block'
                        }`}
                      >
                        {m.name}
                      </span>
                    </div>
                  </div>
                </div>
                {m.isDivider && (
                  <div className="divider-menu">
                    <Divider className="w-100" />
                  </div>
                )}
              </ListItem>
            </>
          ))}
      </List>
    </Popover>
  )
}

export default CustomPopover
