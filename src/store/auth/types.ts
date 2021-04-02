export const AUTH_SIGN_IN = 'AUTH_SIGN_IN'
export const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS'
export const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR'

export interface AuthSignInAction {
  type: typeof AUTH_SIGN_IN
  payload: {
    user: {
      name: string
      email: string
    }
  }
}

export interface AuthSignInSuccessAction {
  type: typeof AUTH_SIGN_IN_SUCCESS
  payload: {
    user: {
      name: string
    }
  }
}

export interface AuthSignInError {
  type: typeof AUTH_SIGN_IN_ERROR
  error: Error
}

export type AuthActionsType =
  | AuthSignInAction
  | AuthSignInSuccessAction
  | AuthSignInError

export interface AuthState {
  user?: {
    name: string
  }
  loading: boolean
  error?: Error
}
