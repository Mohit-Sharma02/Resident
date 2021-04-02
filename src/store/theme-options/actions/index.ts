import { SET_THEME_OPTIONS, ThemeOptionsActionType } from '../types'

export * from './footer'
export * from './header'
export * from './main'
export * from './page-title'
export * from './sidebar'

type SetThemeOptionsDto = {
  options: { [key: string]: unknown }
}

export function setThemeOptions({
  options,
}: SetThemeOptionsDto): ThemeOptionsActionType {
  return {
    type: SET_THEME_OPTIONS,
    options,
  }
}
