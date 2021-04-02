import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const middleWareEnhancer = applyMiddleware(sagaMiddleware)

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer),
  )

  sagaMiddleware.run(rootSaga)

  return store
}
