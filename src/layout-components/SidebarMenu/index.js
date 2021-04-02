import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Divider } from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import uuid from 'react-uuid'

import { useTranslate } from 'src/locale'
import { sidebarRoutes } from 'src/SideBarMenuRoutes'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

const SidebarMenu = (props) => {
  const translate = useTranslate()
  const [accordion, setAccordion] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ])
  const { setSidebarToggleMobile, sidebarUserbox, sidebarToggle } = props

  const toggleSidebarMobile = () => setSidebarToggleMobile(false)

  const [dashboardOpen, setDashboardOpen] = useState(false)
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen)
    event.preventDefault()
  }

  const [elementsOpen, setElementsOpen] = useState(false)
  const toggleElements = (event) => {
    setElementsOpen(!elementsOpen)
    event.preventDefault()
  }

  const [pagesOpen, setPagesOpen] = useState(false)
  const togglePages = (event) => {
    setPagesOpen(!pagesOpen)
    event.preventDefault()
  }

  const [otherPagesOpen, setOtherPagesOpen] = useState(false)
  const toggleOtherPages = (event) => {
    setOtherPagesOpen(!otherPagesOpen)
    event.preventDefault()
  }

  const [applicationOpen, setApplicationOpen] = useState(false)
  const toggleApplication = (event) => {
    setApplicationOpen(!applicationOpen)
    event.preventDefault()
  }

  const [designSystemOpen, setDesignSystemOpen] = useState(false)
  const toggleDesignSystem = (event) => {
    setDesignSystemOpen(!designSystemOpen)
    event.preventDefault()
  }

  const [blocksOpen, setBlocksOpen] = useState(false)
  const toggleBlocks = (event) => {
    setBlocksOpen(!blocksOpen)
    event.preventDefault()
  }

  const [levelsOpen, setLevelsOpen] = useState(false)
  const toggleLevels = (event) => {
    setLevelsOpen(!levelsOpen)
    event.preventDefault()
  }

  const [widgetsOpen, setWidgetsOpen] = useState(false)
  const toggleWidgets = (event) => {
    setWidgetsOpen(!widgetsOpen)
    event.preventDefault()
  }

  const [chartsOpen, setChartsOpen] = useState(false)
  const toggleCharts = (event) => {
    setChartsOpen(!chartsOpen)
    event.preventDefault()
  }

  const [uiKitComponentsOpen, setUiKitComponents] = useState(false)
  const toggleUiKitComponents = (event) => {
    setUiKitComponents(!uiKitComponentsOpen)
    event.preventDefault()
  }

  const [formsComponentsOpen, setFormsComponents] = useState(false)
  const toggleFormsComponents = (event) => {
    setFormsComponents(!formsComponentsOpen)
    event.preventDefault()
  }

  const [collapsedLayoutOpen, setCollapsedLayoutOpen] = useState(false)
  const toggleCollapsedLayout = (event) => {
    setCollapsedLayoutOpen(!collapsedLayoutOpen)
    event.preventDefault()
  }

  const [pagesLoginOpen, setPagesLoginOpen] = useState(false)
  const togglePagesLogin = (event) => {
    setPagesLoginOpen(!pagesLoginOpen)
    event.preventDefault()
  }

  const [pagesRegisterOpen, setPagesRegisterOpen] = useState(false)
  const togglePagesRegister = (event) => {
    setPagesRegisterOpen(!pagesRegisterOpen)
    event.preventDefault()
  }

  const [pagesRecoverOpen, setPagesRecoverOpen] = useState(false)
  const togglePagesRecover = (event) => {
    setPagesRecoverOpen(!pagesRecoverOpen)
    event.preventDefault()
  }

  const toggleAccordion = (tab) => {
    const prevState = accordion
    const state = prevState.map((x, index) => (tab === index ? !x : x))
    setAccordion(state)
  }

  const isMobileOrIpad = isMobile() || isIpad()

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return JSON.parse(user)
  }

  const user = getUserData()

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <ul>
            <li>
              {sidebarRoutes.map((route, index) => {
                return (
                  <Fragment key={uuid()}>
                    {index > 0 && <Divider className="mt-3 mb-1" />}
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
                            {!sidebarToggle && (
                              <>
                                <span className="sidebar-item-label sidebar-title-menu sidebar-font text-white mr-auto">
                                  {translate(`${route.name}`).toUpperCase()}
                                </span>
                                <FontAwesomeIcon
                                  icon={
                                    accordion[index]
                                      ? ['fas', 'angle-up']
                                      : ['fas', 'angle-down']
                                  }
                                  className="font-size-xl accordion-icon"
                                />
                              </>
                            )}
                          </div>
                        )}

                    {route.menu &&
                      route.menu.map((r) => {
                        if (
                          (r.isHideMobile && isMobileOrIpad) ||
                          (r?.name === 'departments_live' &&
                            user?.role !== 'ElectedOfficial')
                        ) {
                          return null
                        } else {
                          return (
                            <Collapse in={accordion[index]}>
                              {!r.isRedirect ? (
                                <NavLink
                                  key={uuid()}
                                  activeClassName="active"
                                  onClick={toggleSidebarMobile}
                                  className="nav-link-simple"
                                  to={r.isWorking ? r.routePath : '#'}
                                >
                                  <span className="sidebar-icon mr-1">
                                    {r.iconLightBlue}
                                  </span>
                                  {!sidebarToggle && (
                                    <span className="sidebar-font text-primary-light">
                                      {translate(`${r.name}`)}
                                    </span>
                                  )}
                                </NavLink>
                              ) : (
                                <a
                                  href={r.routePath}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <span className="sidebar-icon mr-1">
                                    {r.iconLightBlue}
                                  </span>
                                  {!sidebarToggle && (
                                    <span className="sidebar-font text-primary-light">
                                      {translate(`${r.name}`)}
                                    </span>
                                  )}
                                </a>
                              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)
