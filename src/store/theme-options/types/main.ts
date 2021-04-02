export const SET_CONTENT_BACKGROUND = 'THEME_OPTIONS/SET_CONTENT_BACKGROUND'
export const SET_THEME_CONFIGURATOR_TOGGLE =
  'THEME_OPTIONS/SET_THEME_CONFIGURATOR_TOGGLE'

export interface SetContentBackground {
  type: typeof SET_CONTENT_BACKGROUND
  contentBackground: string
}

export interface SetThemeConfiguratorToggle {
  type: typeof SET_THEME_CONFIGURATOR_TOGGLE
  themeConfiguratorToggle: boolean
}

export type MainAction = SetContentBackground | SetThemeConfiguratorToggle

export interface MainState {
  contentBackground: string
  themeConfiguratorToggle: boolean
}
