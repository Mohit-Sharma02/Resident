import { all, delay, put, takeLatest } from 'redux-saga/effects'

import { authSignInError, authSignInSuccess } from './actions'
import { AUTH_SIGN_IN, AuthSignInAction } from './types'

function* signIn(action: AuthSignInAction): Generator {
  const { name } = action.payload.user
  yield delay(3000)
  // randomize response
  if (Math.random() < 0.5) {
    yield put(authSignInSuccess({ user: { name } }))
  } else {
    yield put(authSignInError(new Error('There was an unknown error.')))
  }
}

const authSagas = all([takeLatest(AUTH_SIGN_IN, signIn)])

export default authSagas
