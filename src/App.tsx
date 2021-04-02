import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Modal from 'react-modal'
import { QueryClient, QueryClientProvider } from 'react-query'

import Routes from './routes'
import configureStore from './store'
import ScrollToTop from './utils/ScrollToTop'

import './assets/base.scss'
import './initIcons.ts'

const store = configureStore()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
})

const PUBLIC_KEY = 'DUMMY_PUBLIC_KEY'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

Modal.setAppElement('#root')

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Elements stripe={stripeTestPromise}>
        <BrowserRouter basename="/">
          <ScrollToTop>
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          </ScrollToTop>
        </BrowserRouter>
      </Elements>
    </Provider>
  )
}

export default App
