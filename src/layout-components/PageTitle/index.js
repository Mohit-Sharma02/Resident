import React, { useState } from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Fab } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import CustomPopover from 'src/components/PopOver'
import { useTranslate } from 'src/locale'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as Import } from '../../assets/svgs/action_save_download.svg'
import { ReactComponent as Settings } from '../../assets/svgs/profile_setting_icon.svg'

const PageTitle = (props) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[600],
        },
      },
    }),
  )
  const translate = useTranslate()

  const classes = useStyles()
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    titleHeading,
    titleDescription,
    children,
    isActionAvailable,
    icon,
  } = props
  const isMobileOrIpad = isMobile() || isIpad()

  const [modal1, setModal1] = useState(false)
  const toggle1 = () => setModal1(!modal1)
  const [anchorEl, setAnchorEl] = useState(null)

  function openUserMenu(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }

  const handleClickMenu = () => {
    return null
  }

  const menu = [
    {
      name: 'Settings',
      icon: <Settings style={{ fill: 'black' }} />,
    },
    {
      name: 'Import',
      icon: <Import style={{ fill: 'black' }} />,
    },
  ]

  return (
    <>
      <div
        className={clsx(
          `app-page-title  MuiCard-root shadow_gray ${
            !isMobileOrIpad && 'card-box page_title_shadow'
          }`,
          pageTitleStyle,
          pageTitleBackground,
          {
            'app-page-title--shadow': pageTitleShadow,
          },
        )}
      >
        <div className="app-page-title--first">
          {pageTitleIconBox && (
            <div className="app-page-title--iconbox d-70">
              <div className="d-70 d-flex align-items-center justify-content-center display-1">
                {icon}
              </div>
            </div>
          )}
          <div>
            <h1 className={`${isMobileOrIpad && 'mt-3'} text-head main-head`}>
              {translate(titleHeading)}
            </h1>
            {pageTitleDescription && titleDescription && !isMobileOrIpad && (
              <div className="app-page-title--description setting_head_title">
                {translate(titleDescription)}
              </div>
            )}
          </div>
        </div>

        {isActionAvailable && (
          <div className="align-items-center">
            {children}
            <Button
              variant="contained"
              onClick={openUserMenu}
              size="small"
              className="page-title-action-btn d-40 py-0 px-4 w-auto mx-0 mr-3 mr-lg-0 mx-lg-3"
            >
              <span className="btn-wrapper--label ">Actions</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon
                  icon={['fas', 'angle-down']}
                  className="opacity-5"
                />
              </span>
            </Button>
            <CustomPopover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              handleClick={handleClickMenu}
              handleClose={handleClose}
              title={titleHeading}
              submenu={menu}
            />
            {isMobileOrIpad && (
              <Fab
                aria-label="add"
                className={`d-40 py-2 fab-btn btn-success ${clsx(
                  classes.fabGreen,
                )}`}
                size="large"
                onClick={toggle1}
              >
                <FontAwesomeIcon
                  icon={['fas', 'plus']}
                  size="large"
                  className="opacity-8"
                />
              </Fab>
            )}
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  pageTitleStyle: state.ThemeOptions.pageTitleStyle,
  pageTitleBackground: state.ThemeOptions.pageTitleBackground,
  pageTitleShadow: state.ThemeOptions.pageTitleShadow,
  pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
  pageTitleDescription: state.ThemeOptions.pageTitleDescription,
})

export default connect(mapStateToProps)(PageTitle)
