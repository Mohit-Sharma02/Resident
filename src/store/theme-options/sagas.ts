import { all, call, put, takeLatest } from 'redux-saga/effects'

import { getThemeOptions } from 'src/services/firebase/getThemeSettings'

import { setThemeOptions } from './actions'

function* updateOptions(): Generator {
  const options = yield call(getThemeOptions)

  yield put(
    setThemeOptions({
      options: options as any,
    }),
  )
}

const themeOptionsSaga = all([
  takeLatest('UPDATE_THEME_OPTIONS', updateOptions),
])

export default themeOptionsSaga
