import { SET_LOCALE, SetLocaleType } from './types'

type SetLocalDto = {
  locale: string
}

export function SetLocale(locale: SetLocalDto): SetLocaleType {
  return {
    type: SET_LOCALE,
    payload: {
      locale,
    },
  }
}
