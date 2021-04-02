import React from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'

import SidebarHeader from 'src/layout-components/SidebarHeader'
import SidebarMenuSettings from 'src/layout-components/SidebarMenuSettings'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'

const SidebarSettings = ({
  sidebarStyle,
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
        <SidebarHeader isSettingsMenu={true} />
        <div className="app-sidebar--content">
          <SidebarMenuSettings />
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSettings)
