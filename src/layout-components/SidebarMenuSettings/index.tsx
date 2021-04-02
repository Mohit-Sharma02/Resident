import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Divider } from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import uuid from 'react-uuid'

import { useTranslate } from 'src/locale'
import { sidebarSettingRoutes } from 'src/SideBarMenuSettingsRoutes'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

const SidebarMenuSettings = (props) => {
  const [accordion, setAccordion] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ])
  const translate = useTranslate()
  const toggleAccordion = (tab) => {
    const prevState = accordion
    const state = prevState.map((x, index) => (tab === index ? !x : x))
    setAccordion(state)
  }
  const isMobileOrIpad = isMobile() || isIpad()
  const { setSidebarToggleMobile } = props

  const toggleSidebarMobile = () => setSidebarToggleMobile(false)

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <ul>
            <li>
              {sidebarSettingRoutes.map((route, index) => {
                return (
                  <Fragment key={uuid()}>
                    <Divider />
                    {route.isHideMobile && isMobileOrIpad
                      ? null
                      : route.name && (
                          <div
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={accordion[index]}
                            className="sidebar-header d-flex flex-row"
                          >
                            <span className="sidebar-icon mr-2">
                              {route.nameIcon}
                            </span>
                            <span className="sidebar-item-label sidebar-title-menu sidebar-font text-white mr-auto">
                              {translate(route.name).toUpperCase()}
                            </span>
                            <FontAwesomeIcon
                              icon={
                                accordion[index]
                                  ? ['fas', 'angle-up']
                                  : ['fas', 'angle-down']
                              }
                              className="font-size-xl accordion-icon"
                            />
                          </div>
                        )}

                    {route.menu &&
                      route.menu.map((r) => {
                        if (r.isHideMobile && isMobileOrIpad) {
                          return null
                        } else {
                          return (
                            <Collapse in={accordion[index]}>
                              <NavLink
                                key={uuid()}
                                activeClassName="active"
                                onClick={toggleSidebarMobile}
                                className="nav-link-simple"
                                to={r.isWorking ? `${r.routePath}` : '#'}
                              >
                                <span className="sidebar-icon mr-1">
                                  {r.iconLightBlue}
                                </span>
                                <span className="sidebar-font text-primary-light">
                                  {translate(r.name)}
                                </span>
                              </NavLink>
                            </Collapse>
                          )
                        }
                      })}
                  </Fragment>
                )
              })}
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenuSettings)
