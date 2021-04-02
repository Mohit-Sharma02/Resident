import React from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'

import SidebarHeader from 'src/layout-components/SidebarHeader'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'

import SidebarMenuMapView from '../SidebarMenuMapView'

const SidebarMapView = ({
  sidebarStyle,
  sidebarToggle,
  sidebarShadow,
  sidebarToggleMobile,
  setSidebarToggleMobile,
}) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile)
  }

  return (
    <>
      <div
        className={clsx('app-sidebar', sidebarStyle, {
          'app-sidebar--shadow': sidebarShadow,
        })}
      >
        <SidebarHeader
          isSettingsMenu={false}
          isCollapsible={true}
          isMapMenu={true}
        />
        <div className="app-sidebar--content">
          <SidebarMenuMapView sidebarToggle={sidebarToggle} />
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
  sidebarFooter: state.ThemeOptions.sidebarFooter,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMapView)
