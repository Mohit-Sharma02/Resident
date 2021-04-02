import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-ui/core'

import CustomPopover from 'src/components/PopOver'

import avatar7 from '../../assets/images/avatars/avatar7.jpg'
import { ReactComponent as Personal } from '../../assets/svgs/Personal.svg'
import { ReactComponent as Account } from '../../assets/svgs/profile_account_icon.svg'
import { ReactComponent as Notification } from '../../assets/svgs/profile_notification_icon.svg'
import { ReactComponent as Workplace } from '../../assets/svgs/profile_workplace_icon.svg'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HeaderUserbox = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickMenu = () => {
    return null
  }

  const menu = [
    // {
    //   name: 'Settings',
    //   // isDivider: true,
    //   // isDisabled: true
    // },
    {
      name: 'Personal',
      icon: <Personal />,
    },
    {
      name: 'Account',
      icon: <Account />,
    },
    {
      name: 'My Workplace',
      icon: <Workplace />,
    },
    {
      name: 'Notification',
      icon: <Notification />,
    },
  ]

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        className="ml-2 btn-transition-none text-left ml-2 p-0 bg-transparent d-flex align-items-center"
        disableRipple
      >
        <div className="d-block p-0 avatar-icon-wrapper">
          <div className="avatar-icon rounded">
            <img src={avatar7} alt="..." />
          </div>
        </div>

        <div className="d-none d-xl-block pl-2">
          <div className="font-weight-bold pt-2 line-height-1">Emma Taylor</div>
          <span className="text-black-50">Senior Accountant</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        title={'Settings'}
        handleClick={handleClickMenu}
        submenu={menu}
      />
    </>
  )
}

export default HeaderUserbox
