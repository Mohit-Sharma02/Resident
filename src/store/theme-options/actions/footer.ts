import {
  SET_FOOTER_BG_TRANSPARENT,
  SET_FOOTER_FIXED,
  SET_FOOTER_SHADOW,
  ThemeOptionsActionType,
} from '../types'

export function setFooterFixed(footerFixed: boolean): ThemeOptionsActionType {
  return {
    type: SET_FOOTER_FIXED,
    footerFixed,
  }
}

export function setFooterShadow(footerShadow: boolean): ThemeOptionsActionType {
  return {
    type: SET_FOOTER_SHADOW,
    footerShadow,
  }
}

export function setFooterBgTransparent(
  footerBgTransparent: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_FOOTER_BG_TRANSPARENT,
    footerBgTransparent,
  }
}
