import { SET_LOCALE, SetLocaleState, SetLocaleType } from './types'

const path = window.location.pathname
const initialState: SetLocaleState = {
  locale: path.split('/')[1],
}

export function localeReducer(
  state = initialState,
  action: SetLocaleType,
): SetLocaleState {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...initialState,
        locale: action.payload.locale,
      }

    default:
      return state
  }
}
