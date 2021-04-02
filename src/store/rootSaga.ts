import { all } from 'redux-saga/effects'

import authSagas from './auth/sagas'
import themeOptionsSaga from './theme-options/sagas'

export default function* rootSaga(): Generator {
  yield all([authSagas, themeOptionsSaga])
}
