import {
  SET_SIDEBAR_FIXED,
  SET_SIDEBAR_FOOTER,
  SET_SIDEBAR_SHADOW,
  SET_SIDEBAR_STYLE,
  SET_SIDEBAR_TOGGLE,
  SET_SIDEBAR_TOGGLE_MOBILE,
  SET_SIDEBAR_USERBOX,
  ThemeOptionsActionType,
} from '../types'

export function setSidebarShadow(
  sidebarShadow: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_SHADOW,
    sidebarShadow,
  }
}

export function setSidebarFixed(sidebarFixed: boolean): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_FIXED,
    sidebarFixed,
  }
}

export function setSidebarStyle(sidebarStyle: string): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_STYLE,
    sidebarStyle,
  }
}

export function setSidebarFooter(
  sidebarFooter: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_FOOTER,
    sidebarFooter,
  }
}

export function setSidebarToggleMobile(
  sidebarToggleMobile: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_TOGGLE_MOBILE,
    sidebarToggleMobile,
  }
}

export function setSidebarToggle(
  sidebarToggle: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_TOGGLE,
    sidebarToggle,
  }
}

export function setSidebarUserbox(
  sidebarUserbox: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_SIDEBAR_USERBOX,
    sidebarUserbox,
  }
}
