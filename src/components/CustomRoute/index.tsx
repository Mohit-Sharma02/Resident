import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps, matchPath } from 'react-router-dom'

import { MinimalLayout } from 'src/layout-blueprints'
import { PageTitle } from 'src/layout-components'
import { locales } from 'src/locale'
import { sidebarRoutes } from 'src/SideBarMenuRoutes'
import { RootState } from 'src/store/rootReducer'
type CustomRouteProps = {
  layout?: React.ComponentType
  component: React.ComponentType
  path: string
} & RouteProps

const CustomRoute: React.FC<CustomRouteProps> = ({
  layout: Layout = MinimalLayout,
  path,
  component: Component,
  ...rest
}) => {
  const { locale } = useSelector((state: RootState) => state.locale)
  const intlPaths = locales.map((it) => `/:locale(${it.prefix})${path}`)
  const routePaths = [path, ...intlPaths]

  return (
    <Route
      {...rest}
      path={routePaths}
      render={(props) => {
        if (matchPath(props.location.pathname, { path, exact: true })) {
          return <Redirect to={`/${locale}${path}`} />
        }

        const section = sidebarRoutes.find((route) => {
          return route.menu.find((menu) => menu.routePath === path)
        })

        const menu =
          section && section.menu.find((menu) => menu.routePath === path)

        return (
          <Layout>
            {menu && (
              <PageTitle
                titleHeading={menu.name}
                icon={menu.iconBlue}
                titleDescription={menu.description}
                isActionAvailable={menu.isActionAvailable}
              />
            )}
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

export default CustomRoute
