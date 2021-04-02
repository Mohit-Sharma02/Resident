export const SET_SIDEBAR_SHADOW = 'THEME_OPTIONS/SET_SIDEBAR_SHADOW'
export const SET_SIDEBAR_STYLE = 'THEME_OPTIONS/SET_SIDEBAR_STYLE'
export const SET_SIDEBAR_FOOTER = 'THEME_OPTIONS/SET_SIDEBAR_FOOTER'
export const SET_SIDEBAR_TOGGLE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE'
export const SET_SIDEBAR_TOGGLE_MOBILE =
  'THEME_OPTIONS/SET_SIDEBAR_TOGGLE_MOBILE'
export const SET_SIDEBAR_FIXED = 'THEME_OPTIONS/SET_SIDEBAR_FIXED'
export const SET_SIDEBAR_USERBOX = 'THEME_OPTIONS/SET_SIDEBAR_USERBOX'

export interface SetSidebarShadow {
  type: typeof SET_SIDEBAR_SHADOW
  sidebarShadow: boolean
}

export interface SetSidebarStyle {
  type: typeof SET_SIDEBAR_STYLE
  sidebarStyle: string
}

export interface SetSidebarFooter {
  type: typeof SET_SIDEBAR_FOOTER
  sidebarFooter: boolean
}

export interface SetSidebarToggle {
  type: typeof SET_SIDEBAR_TOGGLE
  sidebarToggle: boolean
}

export interface SetSidebarToggleMobile {
  type: typeof SET_SIDEBAR_TOGGLE_MOBILE
  sidebarToggleMobile: boolean
}

export interface SetSidebarFixed {
  type: typeof SET_SIDEBAR_FIXED
  sidebarFixed: boolean
}

export interface SetSidebarUserbox {
  type: typeof SET_SIDEBAR_USERBOX
  sidebarUserbox: boolean
}

export type SidebarAction =
  | SetSidebarShadow
  | SetSidebarStyle
  | SetSidebarFooter
  | SetSidebarToggle
  | SetSidebarToggleMobile
  | SetSidebarFixed
  | SetSidebarUserbox

export interface SidebarState {
  sidebarFixed: boolean
  sidebarFooter: boolean
  sidebarShadow: boolean
  sidebarStyle: string
  sidebarUserbox: boolean
  sidebarToggleMobile: boolean
  sidebarToggle: boolean
}
