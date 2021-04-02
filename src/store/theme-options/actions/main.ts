import {
  SET_CONTENT_BACKGROUND,
  SET_THEME_CONFIGURATOR_TOGGLE,
  ThemeOptionsActionType,
} from '../types'

export function setContentBackground(
  contentBackground: string,
): ThemeOptionsActionType {
  return {
    type: SET_CONTENT_BACKGROUND,
    contentBackground,
  }
}

export function setThemeConfiguratorToggle(
  themeConfiguratorToggle: boolean,
): ThemeOptionsActionType {
  return {
    type: SET_THEME_CONFIGURATOR_TOGGLE,
    themeConfiguratorToggle,
  }
}
