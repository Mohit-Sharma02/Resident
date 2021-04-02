export const SET_PAGE_TITLE_STYLE = 'THEME_OPTIONS/SET_PAGE_TITLE_STYLE'
export const SET_PAGE_TITLE_BACKGROUND =
  'THEME_OPTIONS/SET_PAGE_TITLE_BACKGROUND'
export const SET_PAGE_TITLE_SHADOW = 'THEME_OPTIONS/SET_PAGE_TITLE_SHADOW'
export const SET_PAGE_TITLE_ICON_BOX = 'THEME_OPTIONS/SET_PAGE_TITLE_ICON_BOX'
export const SET_PAGE_TITLE_DESCRIPTION =
  'THEME_OPTIONS/SET_PAGE_TITLE_DESCRIPTION'

export interface SetPageTitleStyle {
  type: typeof SET_PAGE_TITLE_STYLE
  pageTitleStyle: string
}

export interface SetPageTitleBackground {
  type: typeof SET_PAGE_TITLE_BACKGROUND
  pageTitleBackground: string
}

export interface SetPageTitleShadow {
  type: typeof SET_PAGE_TITLE_SHADOW
  pageTitleShadow: boolean
}

export interface SetPageTitleIconBox {
  type: typeof SET_PAGE_TITLE_ICON_BOX
  pageTitleIconBox: boolean
}

export interface SetPageTitleDescription {
  type: typeof SET_PAGE_TITLE_DESCRIPTION
  pageTitleDescription: boolean
}

export type PageTitleAction =
  | SetPageTitleStyle
  | SetPageTitleBackground
  | SetPageTitleShadow
  | SetPageTitleIconBox
  | SetPageTitleDescription

export interface PageTitleState {
  pageTitleStyle: string
  pageTitleBackground: string
  pageTitleShadow: boolean
  pageTitleIconBox: boolean
  pageTitleDescription: boolean
}
