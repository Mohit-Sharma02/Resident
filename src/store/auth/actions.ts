import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_SUCCESS,
  AuthActionsType,
} from './types'

type AuthSignInDto = {
  user: {
    name: string
    email: string
  }
}

export function authSignIn({ user }: AuthSignInDto): AuthActionsType {
  return {
    type: AUTH_SIGN_IN,
    payload: {
      user,
    },
  }
}

export function authSignInError(error: Error): AuthActionsType {
  return {
    type: AUTH_SIGN_IN_ERROR,
    error,
  }
}

type AuthSignInSuccessDto = {
  user: {
    name: string
  }
}

export function authSignInSuccess({
  user,
}: AuthSignInSuccessDto): AuthActionsType {
  return {
    type: AUTH_SIGN_IN_SUCCESS,
    payload: {
      user,
    },
  }
}
