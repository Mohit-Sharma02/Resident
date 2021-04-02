import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import PerfectScrollbar from 'react-perfect-scrollbar'
import uuid from 'react-uuid'

import { useTranslate } from 'src/locale'
import { sidebarRoutes } from 'src/SideBarMenuRoutes'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as ProjectLogo } from '../../assets/svgs/logo_citycare_icon_light.svg'
const SidebarCollapsed = ({
  sidebarShadow,
  sidebarStyle,
  sidebarToggleMobile,
  setSidebarToggleMobile,
}) => {
  const translate = useTranslate()
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile)
  }
  const isMobileOrIpad = isMobile() || isIpad()

  return (
    <>
      <div
        className={clsx(
          'app-sidebar app-sidebar--collapsed app-sidebar--mini',
          sidebarStyle,
          { 'app-sidebar--shadow': sidebarShadow },
        )}
      >
        <div className="app-sidebar--header">
          <NavLink to="/dashboard" title="Citycare">
            <ProjectLogo style={{ fill: '#1976D2' }} />
          </NavLink>
        </div>

        <div className="app-sidebar--content sidebar-navigation">
          <PerfectScrollbar>
            <div className="text-center mb-2">
              <Tooltip
                classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                arrow
                placement="right"
                title="Back to dashboard"
              >
                <Button
                  component={NavLink}
                  variant="contained"
                  className="btn-warning btn-icon m-1 p-0 shadow-none text-center font-size-lg d-40 rounded"
                  to="/dashboard"
                >
                  <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                </Button>
              </Tooltip>
            </div>
            <ul className="sidebar-menu-collapsed">
              <li>
                {sidebarRoutes.map((route) => (
                  <Fragment key={uuid()}>
                    {route.isHideMobile && isMobileOrIpad
                      ? null
                      : route.name && (
                          <div className="sidebar-header">
                            <span>{translate(route.name)}</span>
                          </div>
                        )}
                    {route.menu &&
                      route.menu.map((r) => {
                        if (r.isHideMobile && isMobileOrIpad) {
                          return null
                        } else {
                          return (
                            <Tooltip
                              classes={{
                                tooltip: 'tooltip-secondary text-nowrap',
                              }}
                              arrow
                              key={uuid()}
                              placement="right"
                              title={r.name}
                            >
                              <NavLink
                                key={uuid()}
                                activeClassName="active"
                                onClick={toggleSidebarMobile}
                                className="nav-link-simple"
                                to={r.isWorking ? r.routePath : '#'}
                              >
                                <span className="sidebar-icon">{r.icon}</span>
                              </NavLink>
                            </Tooltip>
                          )
                        }
                      })}
                  </Fragment>
                ))}
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
      <div
        onClick={toggleSidebarMobile}
        className={clsx('app-sidebar-overlay', {
          'is-active': sidebarToggleMobile,
        })}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCollapsed)
