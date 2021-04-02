import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { Card, Grid } from '@material-ui/core'

import { useTranslate } from 'src/locale'

import '../../assets/custom/settingMain.scss'

type SettingsDetailsCardProps = {
  menuData: any
}

const SettingsDetailsCard: React.FC<SettingsDetailsCardProps> = ({
  menuData,
}) => {
  const translate = useTranslate()

  return (
    <Fragment>
      {menuData && (
        <Card className={`card-box mb-5 p-3 setting_card`}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="p-3 custom_w100">
              <div className="text-black font-size-sm">
                <div className="d-flex">
                  {menuData.nameIconBlack}
                  <div className="mt-1 ml-1">{translate(menuData.name)}</div>
                </div>
              </div>
              <div className="app-page-title--description setting_title">
                {translate('settings_account_description')}
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="mb-spacing-6 p-3">
            <Grid container spacing={0}>
              {menuData &&
                menuData.menu.map((itm, index) => (
                  <Grid
                    key={index}
                    item
                    lg={itm.name === 'Tools & Equipment' ? 12 : 4}
                    className="setting-route"
                  >
                    <NavLink
                      key={index}
                      activeClassName="active"
                      className="nav-link-simple"
                      to={itm.isWorking ? itm.routePath : '#'}
                    >
                      <div className="d-flex">
                        {itm.iconBlue}
                        <div className="sidebar-font text-primary-light vl-m mt-1 ml-1 menu_sub">
                          {translate(itm.name)}
                        </div>
                      </div>
                    </NavLink>
                  </Grid>
                ))}
            </Grid>
          </div>
        </Card>
      )}
    </Fragment>
  )
}

export default SettingsDetailsCard
