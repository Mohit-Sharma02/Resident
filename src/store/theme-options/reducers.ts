import produce from 'immer'

import {
  SET_SIDEBAR_FIXED,
  SET_SIDEBAR_FOOTER,
  SET_SIDEBAR_SHADOW,
  SET_SIDEBAR_STYLE,
  SET_SIDEBAR_TOGGLE,
  SET_SIDEBAR_TOGGLE_MOBILE,
  SET_SIDEBAR_USERBOX,
  SET_THEME_OPTIONS,
  ThemeOptionsActionType,
  ThemeOptionsState,
} from './types'
import {
  SET_FOOTER_BG_TRANSPARENT,
  SET_FOOTER_FIXED,
  SET_FOOTER_SHADOW,
} from './types/footer'
import {
  SET_HEADER_BG_TRANSPARENT,
  SET_HEADER_DRAWER_TOGGLE,
  SET_HEADER_FIXED,
  SET_HEADER_SEARCH_HOVER,
  SET_HEADER_SHADOW,
} from './types/header'
import {
  SET_CONTENT_BACKGROUND,
  SET_THEME_CONFIGURATOR_TOGGLE,
} from './types/main'
import {
  SET_PAGE_TITLE_BACKGROUND,
  SET_PAGE_TITLE_DESCRIPTION,
  SET_PAGE_TITLE_ICON_BOX,
  SET_PAGE_TITLE_SHADOW,
  SET_PAGE_TITLE_STYLE,
} from './types/page-title'

const initialState: ThemeOptionsState = {
  sidebarFixed: true,
  sidebarFooter: true,
  sidebarShadow: false,
  sidebarStyle: 'app-sidebar--dark',
  sidebarUserbox: true,
  sidebarToggleMobile: false,
  sidebarToggle: false,
  headerFixed: true,
  headerShadow: true,
  headerBgTransparent: true,
  headerSearchHover: false,
  headerDrawerToggle: false,
  contentBackground: '',
  themeConfiguratorToggle: false,
  footerFixed: false,
  footerShadow: false,
  footerBgTransparent: true,
  pageTitleStyle: '',
  pageTitleBackground: '',
  pageTitleShadow: false,
  pageTitleIconBox: true,
  pageTitleDescription: true,
}

export function themeOptionsReducer(
  state = initialState,
  action: ThemeOptionsActionType,
): ThemeOptionsState {
  switch (action.type) {
    case SET_SIDEBAR_SHADOW:
      return produce(state, (draftState) => {
        draftState.sidebarShadow = action.sidebarShadow
      })
    case SET_SIDEBAR_FIXED:
      return produce(state, (draftState) => {
        draftState.sidebarFixed = action.sidebarFixed
      })
    case SET_SIDEBAR_STYLE:
      return produce(state, (draftState) => {
        draftState.sidebarStyle = action.sidebarStyle
      })
    case SET_SIDEBAR_FOOTER:
      return produce(state, (draftState) => {
        draftState.sidebarFooter = action.sidebarFooter
      })
    case SET_SIDEBAR_TOGGLE_MOBILE:
      return produce(state, (draftState) => {
        draftState.sidebarToggleMobile = action.sidebarToggleMobile
      })
    case SET_SIDEBAR_TOGGLE:
      return produce(state, (draftState) => {
        draftState.sidebarToggle = action.sidebarToggle
      })
    case SET_SIDEBAR_USERBOX:
      return produce(state, (draftState) => {
        draftState.sidebarUserbox = action.sidebarUserbox
      })
    case SET_HEADER_FIXED:
      return produce(state, (draftState) => {
        draftState.headerFixed = action.headerFixed
      })
    case SET_HEADER_SHADOW:
      return produce(state, (draftState) => {
        draftState.headerShadow = action.headerShadow
      })
    case SET_HEADER_BG_TRANSPARENT:
      return produce(state, (draftState) => {
        draftState.headerBgTransparent = action.headerBgTransparent
      })
    case SET_HEADER_SEARCH_HOVER:
      return produce(state, (draftState) => {
        draftState.headerSearchHover = action.headerSearchHover
      })
    case SET_HEADER_DRAWER_TOGGLE:
      return produce(state, (draftState) => {
        draftState.headerDrawerToggle = action.headerDrawerToggle
      })
    case SET_CONTENT_BACKGROUND:
      return produce(state, (draftState) => {
        draftState.contentBackground = action.contentBackground
      })
    case SET_THEME_CONFIGURATOR_TOGGLE:
      return produce(state, (draftState) => {
        draftState.themeConfiguratorToggle = action.themeConfiguratorToggle
      })
    case SET_FOOTER_FIXED:
      return produce(state, (draftState) => {
        draftState.footerFixed = action.footerFixed
      })
    case SET_FOOTER_SHADOW:
      return produce(state, (draftState) => {
        draftState.footerShadow = action.footerShadow
      })
    case SET_FOOTER_BG_TRANSPARENT:
      return produce(state, (draftState) => {
        draftState.footerBgTransparent = action.footerBgTransparent
      })
    case SET_PAGE_TITLE_STYLE:
      return produce(state, (draftState) => {
        draftState.pageTitleStyle = action.pageTitleStyle
      })
    case SET_PAGE_TITLE_BACKGROUND:
      return produce(state, (draftState) => {
        draftState.pageTitleBackground = action.pageTitleBackground
      })
    case SET_PAGE_TITLE_SHADOW:
      return produce(state, (draftState) => {
        draftState.pageTitleShadow = action.pageTitleShadow
      })
    case SET_PAGE_TITLE_ICON_BOX:
      return produce(state, (draftState) => {
        draftState.pageTitleIconBox = action.pageTitleIconBox
      })
    case SET_PAGE_TITLE_DESCRIPTION:
      return produce(state, (draftState) => {
        draftState.pageTitleDescription = action.pageTitleDescription
      })
    case SET_THEME_OPTIONS:
      return produce(state, (draftState) => {
        for (const optionName in action.options) {
          if (draftState[optionName] !== undefined) {
            draftState[optionName] = action.options[optionName]
          }
        }
      })
    default:
      return state
  }
}
