export const SET_HEADER_FIXED = 'THEME_OPTIONS/SET_HEADER_FIXED'
export const SET_HEADER_SHADOW = 'THEME_OPTIONS/SET_HEADER_SHADOW'
export const SET_HEADER_BG_TRANSPARENT =
  'THEME_OPTIONS/SET_HEADER_BG_TRANSPARENT'
export const SET_HEADER_SEARCH_HOVER = 'THEME_OPTIONS/SET_HEADER_SEARCH_HOVER'
export const SET_HEADER_DRAWER_TOGGLE = 'THEME_OPTIONS/SET_HEADER_DRAWER_TOGGLE'

export interface SetHeaderFixed {
  type: typeof SET_HEADER_FIXED
  headerFixed: boolean
}

export interface SetHeaderShadow {
  type: typeof SET_HEADER_SHADOW
  headerShadow: boolean
}

export interface SetHeaderBgTransparent {
  type: typeof SET_HEADER_BG_TRANSPARENT
  headerBgTransparent: boolean
}

export interface SetHeaderSearchHover {
  type: typeof SET_HEADER_SEARCH_HOVER
  headerSearchHover: boolean
}

export interface SetHeaderDrawerToggle {
  type: typeof SET_HEADER_DRAWER_TOGGLE
  headerDrawerToggle: boolean
}

export type HeaderAction =
  | SetHeaderFixed
  | SetHeaderShadow
  | SetHeaderBgTransparent
  | SetHeaderSearchHover
  | SetHeaderDrawerToggle

export interface HeaderState {
  headerFixed: boolean
  headerShadow: boolean
  headerBgTransparent: boolean
  headerSearchHover: boolean
  headerDrawerToggle: boolean
}
