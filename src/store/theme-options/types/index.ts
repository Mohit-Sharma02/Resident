import { FooterAction, FooterState } from './footer'
import { HeaderAction, HeaderState } from './header'
import { MainAction, MainState } from './main'
import { PageTitleAction, PageTitleState } from './page-title'
import { SidebarAction, SidebarState } from './sidebar'

export const SET_THEME_OPTIONS = 'SET_THEME_OPTIONS'

export interface SetThemeOptions {
  type: typeof SET_THEME_OPTIONS
  options: { [key: string]: unknown }
}

export type ThemeOptionsActionType =
  | FooterAction
  | HeaderAction
  | MainAction
  | PageTitleAction
  | SidebarAction
  | SetThemeOptions

export type ThemeOptionsState = FooterState &
  HeaderState &
  MainState &
  PageTitleState &
  SidebarState

export * from './footer'
export * from './header'
export * from './main'
export * from './page-title'
export * from './sidebar'
