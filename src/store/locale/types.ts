export const SET_LOCALE = 'SET_LOCALE'

export interface SetLocale {
  type: typeof SET_LOCALE
  payload: {
    locale
  }
}

export type SetLocaleType = SetLocale

export interface SetLocaleState {
  locale: string
}
