import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'
import get from 'lodash/get'
import { useMutation, useQuery } from 'react-query'

import StatusWorkLog from 'src/components/StatusWorkLog'
import { getStatusLog } from 'src/services/firebase/getStatusLog'
import { updateCityEmployeeStatusLog } from 'src/services/firebase/updateCityEmployeeStatusLog'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'
import { convertTimestampToDate } from 'src/utils/convertFirebaseTimestamp.ts'

import { ReactComponent as OffDuty } from '../../assets/svgs/offduty.svg'
import { ReactComponent as OnBreak } from '../../assets/svgs/onbreak.svg'
import { ReactComponent as OnDuty } from '../../assets/svgs/onduty.svg'
import HeaderDots from '../HeaderDots'
import HeaderMenu from '../HeaderMenu'

const Header = (props) => {
  const { data: statusLog, isLoading } = useQuery('statusLog', getStatusLog)

  const [status, setStatus] = useState(statusLog?.status)
  const [statusColor, setStatusColor] = useState('success')
  const [anchorElStatus, setAnchorElStatus] = useState(null)
  const [showUser, setShowUser] = useState(false)
  const openStatus = Boolean(anchorElStatus)

  const { mutate } = useMutation(updateCityEmployeeStatusLog)
  const convertedTimeStamp = convertTimestampToDate(statusLog?.timestamp)
  const handleCloseStatusMenu = () => {
    setAnchorElStatus(null)
  }

  const handleChangeStatus = useCallback(
    (status, isMutate) => {
      setStatus(status)
      if (status === 'offduty') {
        setStatusColor('danger')
      } else if (status === 'onduty') {
        setStatusColor('success')
      } else if (status === 'onbreak') {
        setStatusColor('warning')
      }
      handleCloseStatusMenu()

      !isMutate && mutate({ status, timestamp: new Date() })
    },
    [mutate],
  )

  const showName = () => {
    const storage: any = window.localStorage
    const user = JSON.parse(storage.getItem('user'))
    if (user && user.displayName) {
      return user.displayName
    }

    return 'User'
  }

  const showImage = () => {
    const storage: any = window.localStorage
    const user = JSON.parse(storage.getItem('user'))
    if (user && user.photoURL) {
      return user.photoURL
    } else if (user && user.displayName) {
      return user.displayName.charAt(0)
    }

    return 'u'
  }

  useEffect(() => {
    handleChangeStatus(statusLog?.status, true)
  }, [handleChangeStatus, statusLog])

  useEffect(() => {
    setShowUser(true)
  }, [])

  const statusMenu = [
    { title: 'Set your status' },
    {
      name: 'On Duty',
      key: 'onduty',
      icon: <OnDuty style={{ fill: '#4CAF50' }} />,
    },
    {
      name: 'On Break',
      key: 'onbreak',
      icon: <OnBreak style={{ fill: '#FF9800' }} />,
    },
    {
      name: 'Off Duty',
      key: 'offduty',
      icon: <OffDuty style={{ fill: '#F44336' }} />,
    },
  ]

  const handleClickStatusMenu = (event) => {
    setAnchorElStatus(event.currentTarget)
  }

  const {
    headerShadow,
    headerBgTransparent,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    isMapPage,
  } = props

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile)
  }

  const currentStatus = statusMenu.find((m) => {
    if (status === m.key) {
      return m.name
    }

    return ''
  })

  return (
    <>
      <div
        className={clsx('app-header', {
          'app-header--shadow': headerShadow,
          'app-header--opacity-bg': headerBgTransparent,
        })}
      >
        <div className="app-header--pane">
          <button
            className={clsx(
              'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
              { 'is-active': sidebarToggleMobile },
            )}
            onClick={toggleSidebarMobile}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
          <HeaderMenu />
        </div>
        <div className="app-header--pane">
          <HeaderDots isMapPage={isMapPage} />
          {showUser && (
            <StatusWorkLog
              menu={statusMenu}
              state={{
                anchorEl: anchorElStatus,
                currentStatus: get(currentStatus, 'name', ''),
                statusColor,
                open: openStatus,
                username: showName(),
                userPhoto: showImage(),
                title: 'Set your status',
                loading: isLoading,
                timestamp: convertedTimeStamp,
              }}
              props={{
                handleClickStatusMenu,
                handleCloseStatusMenu,
                handleChangeStatus,
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
