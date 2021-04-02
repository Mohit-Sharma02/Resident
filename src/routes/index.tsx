import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { IntlProvider } from 'react-intl'
import { ClimbingBoxLoader } from 'react-spinners'

import { locales, useTranslate } from 'src/locale'
import { SetLocale } from 'src/store/locale/actions'
import { RootState } from 'src/store/rootReducer'

import CustomRoute from '../components/CustomRoute'
import PrivateRoute from '../components/PrivateRoute'
import {
  LeftSidebar,
  LeftSidebarMapView,
  LeftSidebarSettings,
  MinimalLayout,
} from '../layout-blueprints'
import MuiTheme from '../theme'
import { Paths } from './paths'

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const { locale } = useSelector((state: RootState) => state.locale)
  const messages = locales.find((it) => it.locale === locale)?.messages

  if (!locale) {
    dispatch(SetLocale('en'))
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_THEME_OPTIONS',
    })
  }, [dispatch])

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3,
  }

  const SuspenseLoading = () => {
    const [show, setShow] = useState(false)
    const translate = useTranslate()
    useEffect(() => {
      const timeout = setTimeout(() => setShow(true), 300)

      return () => {
        clearTimeout(timeout)
      }
    }, [])

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  {/* Please Wait while we are loading a data */}
                  {translate('loading_text')}
                  {/* <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  const routes = [
    {
      layout: MinimalLayout,
      path: Paths.LOGIN,
      component: lazy(() => import('../pages/Login')),
    },
    {
      layout: LeftSidebar,
      path: Paths.DASHBOARD,
      component: lazy(() => import('../pages/Dashboard')),
    },
    {
      layout: LeftSidebar,
      path: Paths.CONNECTORS,
      component: lazy(() => import('../pages/Connectors')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.SETTINGS,
      component: lazy(() => import('../pages/Settings')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.SETTINGS_RESIDENT_POSTS,
      component: lazy(() => import('../pages/settingPages/ResidentPosts')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.SETTINGS_RESIDENT,
      component: lazy(() => import('../pages/settingPages/Resident')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.INVOICES,
      component: lazy(() => import('../pages/Invoices')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.PAYMENT_METHOD,
      component: lazy(() => import('../pages/PaymentMethod')),
    },
    {
      layout: LeftSidebar,
      path: Paths.CHAT,
      component: lazy(() => import('../pages/Chat')),
    },
    {
      layout: LeftSidebar,
      path: Paths.CALENDAR,
      component: lazy(() => import('../pages/Calendar')),
    },
    {
      layout: LeftSidebarMapView,
      path: Paths.MAP_VIEW,
      component: lazy(() => import('../pages/MapView')),
    },
    {
      layout: LeftSidebar,
      path: Paths.REQUESTS,
      component: lazy(() => import('../pages/Requests')),
    },
    {
      layout: LeftSidebar,
      path: Paths.APPRECIATIONS,
      component: lazy(() => import('../pages/Appreciations')),
    },
    {
      layout: LeftSidebar,
      path: Paths.ALERTS,
      component: lazy(() => import('../pages/Alerts')),
    },
    {
      layout: LeftSidebar,
      path: Paths.SUGGESTIONS,
      component: lazy(() => import('../pages/Suggestions')),
    },
    {
      layout: LeftSidebar,
      path: Paths.DEPARTMENTS,
      component: lazy(() => import('../pages/Departments')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.SUBSCRIPTIONS,
      component: lazy(() => import('../pages/Subscriptions')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.SUBSCRIPTION,
      component: lazy(() => import('../pages/Subscription')),
    },
    {
      layout: MinimalLayout,
      path: '/dashboardWebView',
      component: lazy(() => import('../pages/DashboardWebView')),
    },
    {
      layout: LeftSidebar,
      path: Paths.EMPLOYEES,
      component: lazy(() => import('../pages/Employees')),
    },
    {
      layout: LeftSidebar,
      path: Paths.RESIDENTS,
      component: lazy(() => import('../pages/Residents')),
    },
    {
      layout: LeftSidebarSettings,
      path: Paths.GI,
      component: lazy(() => import('../pages/GeneralSettings')),
    },
    {
      layout: LeftSidebar,
      path: Paths.WORKLOGS,
      component: lazy(() => import('../pages/Worklogs')),
    },
    {
      layout: LeftSidebar,
      path: Paths.RESIDENT_POSTS,
      component: lazy(() => import('../pages/ResidentPosts')),
    },
    {
      layout: LeftSidebar,
      path: Paths.TASKS,
      component: lazy(() => import('../pages/Tasks')),
    },
    {
      layout: MinimalLayout,
      path: '/emails',
      component: lazy(() => import('../pages/Emails')),
    },
  ]

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <IntlProvider locale={locale} messages={messages}>
          <Suspense fallback={<SuspenseLoading />}>
            <Switch>
              <Redirect exact from="/" to={`/${locale || 'en'}/dashboard`} />
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PrivateRoute>
                  {routes.map((route) => (
                    <CustomRoute
                      key={route.path}
                      layout={route.layout}
                      path={route.path}
                      exact
                      component={route.component}
                    />
                  ))}
                </PrivateRoute>
              </motion.div>
            </Switch>
          </Suspense>
        </IntlProvider>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default Routes
