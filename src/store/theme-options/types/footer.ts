export const SET_FOOTER_FIXED = 'THEME_OPTIONS/SET_FOOTER_FIXED'
export const SET_FOOTER_SHADOW = 'THEME_OPTIONS/SET_FOOTER_SHADOW'
export const SET_FOOTER_BG_TRANSPARENT =
  'THEME_OPTIONS/SET_FOOTER_BG_TRANSPARENT'

export interface SetFooterFixed {
  type: typeof SET_FOOTER_FIXED
  footerFixed: boolean
}

export interface SetFooterShadow {
  type: typeof SET_FOOTER_SHADOW
  footerShadow: boolean
}

export interface SetFooterBgTransparent {
  type: typeof SET_FOOTER_BG_TRANSPARENT
  footerBgTransparent: boolean
}

export type FooterAction =
  | SetFooterFixed
  | SetFooterShadow
  | SetFooterBgTransparent

export interface FooterState {
  footerFixed: boolean
  footerShadow: boolean
  footerBgTransparent: boolean
}
