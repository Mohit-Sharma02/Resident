import produce from 'immer'

import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_SUCCESS,
  AuthActionsType,
  AuthState,
} from './types'

const initialState: AuthState = {
  user: undefined,
  loading: false,
  error: undefined,
}

export function authReducer(
  state = initialState,
  action: AuthActionsType,
): AuthState {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        ...initialState,
        loading: true,
      }
    case AUTH_SIGN_IN_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false
        draftState.user = action.payload.user
      })
    case AUTH_SIGN_IN_ERROR:
      return produce(state, (draftState) => {
        draftState.loading = false
        draftState.error = action.error
      })
    default:
      return state
  }
}
