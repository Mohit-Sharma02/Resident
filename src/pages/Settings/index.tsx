import React from 'react'

import { Grid } from '@material-ui/core'

import SettingsDetailsCard from 'src/components/SettingsDetailsCard'
import { PageTitle } from 'src/layout-components'
import { useTranslate } from 'src/locale'
import { sidebarSettingRoutes } from 'src/SideBarMenuSettingsRoutes'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as SettingIcon } from '../../assets/svgs/Vector.svg'

import './styles.scss'

const Setting: React.FC = () => {
  const selectMenuList = (item) => {
    return sidebarSettingRoutes.find((route) => route.name === item)
  }

  const isMobileDevice = isMobile()

  const translate = useTranslate()

  return (
    <>
      <div className="pb-4">
        <PageTitle
          titleHeading={translate('web_login_pt3')}
          titleDescription={translate('whatisnotmeasured')}
          icon={<SettingIcon />}
        />
      </div>
      <Grid container spacing={isMobileDevice ? 0 : 3}>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('account')} />
        </Grid>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('addon_social')} />
        </Grid>
      </Grid>
      <Grid container spacing={isMobileDevice ? 0 : 3}>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('operations_live')} />
        </Grid>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('resource_live')} />
        </Grid>
      </Grid>
      <Grid container spacing={isMobileDevice ? 0 : 3}>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('facilities_live')} />
        </Grid>
        <Grid item md={6} xl={6} sm={6} className="custom_grid">
          <SettingsDetailsCard menuData={selectMenuList('addon_reporting')} />
        </Grid>
      </Grid>
    </>
  )
}

export default Setting
