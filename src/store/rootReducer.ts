import { combineReducers } from 'redux'

import { authReducer } from './auth/reducers'
import { AuthState } from './auth/types'
import { localeReducer } from './locale/reducers'
import { SetLocaleState } from './locale/types'
import { themeOptionsReducer } from './theme-options/reducers'
import { ThemeOptionsState } from './theme-options/types'

export interface RootState {
  ThemeOptions: ThemeOptionsState
  auth: AuthState
  locale: SetLocaleState
}

const rootReducer = combineReducers({
  ThemeOptions: themeOptionsReducer,
  auth: authReducer,
  locale: localeReducer,
})

export default rootReducer
