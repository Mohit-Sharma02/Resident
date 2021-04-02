import {
  SET_HEADER_BG_TRANSPARENT,
  SET_HEADER_DRAWER_TOGGLE,
  SET_HEADER_FIXED,
  SET_HEADER_SEARCH_HOVER,
  SET_HEADER_SHADOW,
  ThemeOptionsActionType,
} from '../types'

export function setHeaderFixed(headerFixed: boolean): ThemeOptionsActionType {
  return {
    type: SET_HEADER_FIXED,
    headerFixed,
  }
}

export function setHeaderShadow(headerShadow: boolean): ThemeOptionsActionType {
  return {
    type: SET_HEADER_SHADOW,
    headerShadow,
  }
}

export function setHeaderBgTransparent(
  headerBgTransparent: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_HEADER_BG_TRANSPARENT,
    headerBgTransparent,
  }
}

export function setHeaderSearchHover(
  headerSearchHover: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_HEADER_SEARCH_HOVER,
    headerSearchHover,
  }
}

export function setHeaderDrawerToggle(
  headerDrawerToggle: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_HEADER_DRAWER_TOGGLE,
    headerDrawerToggle,
  }
}
