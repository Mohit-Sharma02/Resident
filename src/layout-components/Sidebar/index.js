import React from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'

import { setSidebarToggleMobile } from 'src/store/theme-options/actions'

import { SidebarHeader, SidebarMenu } from '../../layout-components'

const Sidebar = ({
  sidebarStyle,
  sidebarShadow,
  sidebarToggle,
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
        <SidebarHeader isCollapsible={true} isSettingsMenu={false} />
        <div className="app-sidebar--content">
          <SidebarMenu sidebarToggle={sidebarToggle} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
