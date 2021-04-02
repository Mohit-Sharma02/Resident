import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Fab, Tooltip } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import clsx from 'clsx'

import {
  setSidebarToggle,
  setSidebarToggleMobile,
} from 'src/store/theme-options/actions'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as CollapseProjectLogo } from '../../assets/svgs/logo_citycare_icon_light.svg'
import { ReactComponent as MapViewProjectLogo } from '../../assets/svgs/logo_citycare_mapview.svg'
import { ReactComponent as SettingsProjectLogo } from '../../assets/svgs/logo_citycare_setting.svg'
import { ReactComponent as ExpandedProjectLogo } from '../../assets/svgs/ProjectLogo.svg'

const SidebarHeader = (props) => {
  const {
    sidebarToggleMobile,
    setSidebarToggleMobile,

    sidebarToggle,
    setSidebarToggle,
  } = props

  const isMobileDetact = isMobile()
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile)
  }
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle)
  }

  const { isSettingsMenu, isMapMenu, isCollapsible } = props
  let projectLogo = <ExpandedProjectLogo style={{ fill: '#1976D2' }} />

  if (isSettingsMenu && !props.isCollapsible) {
    projectLogo = <SettingsProjectLogo />
  }

  if (isMapMenu) {
    projectLogo = <MapViewProjectLogo />
  }
  if (sidebarToggle && !isSettingsMenu) {
    projectLogo = <CollapseProjectLogo style={{ fill: '#1976D2' }} />
  }

  return (
    <>
      <div className="app-sidebar--header">
        <div className="app-sidebar-logo">
          <NavLink to="/" title="Citycare" className="app-sidebar-logo">
            {projectLogo}
          </NavLink>
        </div>
        {isCollapsible ? (
          <>
            {!sidebarToggle ? (
              <Tooltip title="Collapse sidebar" placement="right" arrow>
                <Button
                  onClick={toggleSidebar}
                  className="btn btn-sm collapse-sidebar-btn"
                >
                  <FontAwesomeIcon icon={['far', 'dot-circle']} size="lg" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Expand sidebar" placement="right" arrow>
                <Button
                  onClick={toggleSidebar}
                  className="expand-sidebar-btn btn btn-sm"
                >
                  <FontAwesomeIcon icon={['fas', 'arrows-alt-h']} />
                </Button>
              </Tooltip>
            )}
          </>
        ) : (
          <NavLink to="/dashboard">
            <Tooltip arrow title="Back To Dashboard" placement="right">
              <div className="d-flex flex-row closeIcon">
                {!isMobileDetact && (
                  <Fab color="default" size="small" aria-label="close">
                    <CloseIcon style={{ fill: '#1976D2' }} />
                  </Fab>
                )}
              </div>
            </Tooltip>
          </NavLink>
        )}
        <Button
          className={clsx(
            'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
            { 'is-active': sidebarToggleMobile },
          )}
          onClick={toggleSidebarMobile}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader)
