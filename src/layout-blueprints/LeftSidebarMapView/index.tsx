import React from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import FiltersProvider from 'src/contexts/filters'
import { Header } from 'src/layout-components'
import SidebarMapView from 'src/layout-components/SidebarMapView'

const LeftSidebarMapView = (props) => {
  const {
    children,
    sidebarToggleMobile,
    sidebarToggle,
    sidebarFixed,
    headerSearchHover,
    headerDrawerToggle,
    footerFixed,
    contentBackground,
  } = props

  return (
    <FiltersProvider>
      <div
        className={clsx('app-wrapper', contentBackground, {
          'header-drawer-open': headerDrawerToggle,
          'app-sidebar-collapsed': sidebarToggle,
          'app-sidebar-mobile-open': sidebarToggleMobile,
          'app-sidebar-fixed': sidebarFixed,
          'app-footer-fixed': footerFixed,
          'search-wrapper-open': headerSearchHover,
        })}
      >
        <div>
          <SidebarMapView sidebarToggle={sidebarToggle} />
        </div>
        <div className="app-main">
          <Header isMapPage={true} />
          <div className="app-content">
            <div className="app-content--inner__wrapper">{children}</div>
          </div>
        </div>
      </div>
    </FiltersProvider>
  )
}

LeftSidebarMapView.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground,
})

export default connect(mapStateToProps)(LeftSidebarMapView)
