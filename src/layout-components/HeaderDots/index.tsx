import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import moment from 'moment'
import PropTypes from 'prop-types'
import QrReader from 'react-qr-reader'
import { useMutation } from 'react-query'
import { useHistory, useLocation } from 'react-router'

import { ReactComponent as EN } from 'src/assets/svgs/EN.svg'
import { ReactComponent as ES } from 'src/assets/svgs/ES.svg'
import { ReactComponent as FR } from 'src/assets/svgs/FR.svg'
import { ReactComponent as PT } from 'src/assets/svgs/PT.svg'
import CustomDrawer from 'src/components/CustomDrawer'
import CustomPopover from 'src/components/PopOver'
import { useTranslate } from 'src/locale'
import {
  destroyAll,
  destroySession,
} from 'src/services/firebase/destroySession'
import { getSessions } from 'src/services/firebase/getSessions'
import { InsertSessionRequest } from 'src/services/firebase/insertSessionRequest'
import { SetLocale } from 'src/store/locale/actions'
import { RootState } from 'src/store/rootReducer'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

import { ReactComponent as CommCoach } from '../../assets/svgs/comm_coach.svg'
import { ReactComponent as ComputerImage } from '../../assets/svgs/computer_img.svg'
import { ReactComponent as Computer } from '../../assets/svgs/computer.svg'
import { ReactComponent as HomeBox } from '../../assets/svgs/homeview_box.svg'
import { ReactComponent as Logout } from '../../assets/svgs/logout.svg'
import { ReactComponent as Macos } from '../../assets/svgs/mac_ok.svg'
import { ReactComponent as MapBox } from '../../assets/svgs/mapview_box.svg'
import { ReactComponent as Notifications } from '../../assets/svgs/outline-notifications.svg'
import { ReactComponent as Personal } from '../../assets/svgs/Personal.svg'
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Account } from '../../assets/svgs/profile_account_icon.svg'
import { ReactComponent as Notification } from '../../assets/svgs/profile_notification_icon.svg'
import { ReactComponent as Settings } from '../../assets/svgs/profile_setting_icon.svg'
import { ReactComponent as Workplace } from '../../assets/svgs/profile_workplace_icon.svg'
import { ReactComponent as ResidentLogo } from '../../assets/svgs/resident_logo.svg'
import { ReactComponent as Performance } from '../../assets/svgs/support_citycoach_icon.svg'
import { ReactComponent as Metrices } from '../../assets/svgs/support_guide_icon.svg'
import { ReactComponent as RateUs } from '../../assets/svgs/support_rateus_icon.svg'
import { ReactComponent as Soon } from '../../assets/svgs/support_soon_icon.svg'
import { ReactComponent as Suggestions } from '../../assets/svgs/support_suggestion_icon.svg'
import { ReactComponent as Terms } from '../../assets/svgs/support_term_icon.svg'
import { ReactComponent as Windows } from '../../assets/svgs/windows.svg'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

type PageLocation = {
  page?: string
  entriesPerPage?: string
}

type HeaderDotsProps = {
  isMapPage?: boolean
}

const HeaderDots: React.FC<HeaderDotsProps> = ({ isMapPage }) => {
  const dispatch = useDispatch()
  const location = useLocation<PageLocation>()
  const translate = useTranslate()
  const history = useHistory()
  const isMobileOrIpad = isMobile() || isIpad()
  const [anchorEl2, setAnchorEl2] = useState(null)
  const [anchorEl4, setAnchorEl4] = useState(null)
  const [anchorEl5, setAnchorEl5] = useState(null)
  const [anchorEl6, setAnchorEl6] = useState(null)
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [qrCode, setQrCode] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const { locale } = useSelector((state: RootState) => state.locale)

  const handleClickReports = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleCloseReports = () => {
    setAnchorEl2(null)
  }

  const handleClickSupport = (event) => {
    setAnchorEl4(event.currentTarget)
  }
  const handleCloseSupport = () => {
    setAnchorEl4(null)
  }
  const handleClickLocale = (event) => {
    setAnchorEl6(event.currentTarget)
  }
  const handleCloseLocale = () => {
    setAnchorEl6(null)
  }

  const handleClickSettings = (event) => {
    setAnchorEl5(event.currentTarget)
  }
  const handleCloseSettings = () => {
    setAnchorEl5(null)
  }

  const openReports = Boolean(anchorEl2)
  const openSupport = Boolean(anchorEl4)
  const openLocale = Boolean(anchorEl6)
  const openSettings = Boolean(anchorEl5)
  const [result, setResult] = useState(null)
  const [err, setError] = useState(null)
  const [cancelId, setCancelId] = useState(null)
  const [sessions, setSessions] = useState([])
  const [scanned, setScanned] = useState(false)
  const [user, setUser] = useState()

  const { mutateAsync: mutateInsertSessionRequest } = useMutation(
    InsertSessionRequest,
  )
  const { mutateAsync: mutateGetSessions } = useMutation(getSessions)
  const { mutateAsync: mutateDestroySession } = useMutation(destroySession)
  const { mutateAsync: mutateDestroyAll } = useMutation(destroyAll)
  const toggleModal = () => setModal(!modal)

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return JSON.parse(user)
  }

  const getSessionsHandler = async () => {
    const storage: any = window.localStorage
    const userData = JSON.parse(storage.getItem('user'))
    if (userData) {
      const sessions = await mutateGetSessions(userData.uid)
      setSessions(sessions)
    }
  }

  const destroyAllHandler = async () => {
    const storage: any = window.localStorage
    const userData = JSON.parse(storage.getItem('user'))
    await mutateDestroyAll(userData.uid)
    setSessions([])
  }

  const destroySessionsHandler = async () => {
    const storage: any = window.localStorage
    const userData = JSON.parse(storage.getItem('user'))
    if (userData && cancelId) {
      await mutateDestroySession(cancelId)
      const sessions = await mutateGetSessions(userData.uid)
      setSessions(sessions)
    }
  }

  const toggleDrawer = () => {
    setOpen(!open)
    getSessionsHandler()
  }

  const toggleQrCode = () => {
    getSessionsHandler()
    setQrCode(!qrCode)
  }

  const handleClickMenu = () => {
    return null
  }

  const handleSetLocale = useCallback(
    (locale) => {
      const locationPath = location.pathname.split('/')
      const existingPath =
        locationPath.length > 3
          ? locationPath.slice(2, locationPath.length).join('/')
          : locationPath[locationPath.length - 1]
      dispatch(SetLocale(locale))
      localStorage.setItem('locale', locale)
      history.push(`/${locale}/${existingPath}`)
      setAnchorEl6(null)
    },
    [dispatch],
  )

  const goBack = () => {
    setTimeout(() => {
      setScanned(false)
      toggleQrCode()
    }, 4000)
  }

  const insertSessionRequestHandle = async (data) => {
    if (!scanned) {
      setScanned(true)
      const response = data
      const storage: any = window.localStorage
      const user: any = JSON.parse(storage.getItem('user'))
      await mutateInsertSessionRequest({
        browser: response.browser,
        os: response.os,
        timestamp: 'date',
        uid: response.uid,
        userId: user.uid,
        language: response.language,
      })

      goBack()
    }
  }

  const handleScan = (data) => {
    if (data) {
      setResult(data)
      const updateData = JSON.parse(data)
      updateData.language = locale || 'en'
      insertSessionRequestHandle(updateData)
    }
  }
  const handleError = (err) => {
    console.log({ err })

    setError(err)
  }

  const reportMenu = [
    {
      name: 'Metrices',
      icon: <Metrices />,
    },
    {
      name: 'Performance',
      icon: <Performance />,
    },
    {
      name: 'Notifications',
      icon: <Notifications />,
    },
  ]
  const supportMenu = [
    {
      name: 'User Guide',
      icon: <Metrices />,
    },
    {
      name: 'City Coach',
      icon: <Performance />,
    },
    {
      name: 'Community Coach',
      icon: <CommCoach />,
    },
    {
      name: 'Submit a Suggestion',
      icon: <Suggestions />,
    },
    // {
    //   name: 'Report a Problem',
    //   icon: Problem
    // },
    {
      name: 'Coming Soon',
      icon: <Soon />,
    },
    {
      name: 'Rate Us',
      icon: <RateUs />,
    },
    {
      name: 'Terms of Use',
      icon: <Terms />,
    },
  ]
  const localMenu = [
    {
      name: 'English',
      icon: <EN />,
      key: 'en',
    },
    {
      name: 'Français',
      icon: <FR />,
      key: 'fr',
    },
    {
      name: 'Español',
      icon: <ES />,
      key: 'es',
    },
    {
      name: 'Português',
      icon: <PT />,
      key: 'pt',
    },
  ]

  const settingsMenu = [
    {
      name: 'Personal',
      icon: <Personal />,
    },
    {
      name: 'Account',
      icon: <Account />,
    },
    {
      name: 'My Workplace',
      icon: <Workplace />,
    },
    {
      name: 'Notification',
      icon: <Notification />,
    },
  ]

  const getDate = (date) => {
    try {
      const formatted = moment
        .utc(date.seconds * 1000)
        .format('DD/MM/YYYY HH:mm:ss')

      return formatted
    } catch (e) {
      console.log(e)
    }

    return ''
  }

  const cancel = () => {
    if (cancelId) {
      destroySessionsHandler()
    } else {
      destroyAllHandler()
    }
    toggleModal()
  }

  useEffect(() => {
    const user = getUserData()
    setUser(user)
  }, [])

  return (
    <>
      <div className="d-flex align-items-center popover-header-wrapper">
        {!isMobileOrIpad ? (
          isMapPage ? (
            <Fragment>
              <NavLink to={`/dashboard`}>
                <span className="pr-2">
                  <Button
                    onClick={handleClickMenu}
                    className="btn-transition-none bg-neutral-pink text-pink font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
                  >
                    <span>
                      <HomeBox />
                    </span>
                  </Button>
                </span>
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink to={`/${locale}/mapview`} target="_blank">
                <span className="pr-2">
                  <Button
                    onClick={handleClickMenu}
                    className="btn-transition-none bg-neutral-warning text-warning font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
                  >
                    <span>
                      <MapBox />
                    </span>
                  </Button>
                </span>
              </NavLink>
            </Fragment>
          )
        ) : (
          <Fragment>
            <NavLink to="#">
              <span className="pr-2">
                <Button
                  onClick={() => toggleDrawer()}
                  className="btn-transition-none bg-neutral-warning text-warning font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
                >
                  <span>
                    <Computer style={{ fill: '#FF9800' }} />
                  </span>
                </Button>
              </span>
            </NavLink>
          </Fragment>
        )}
        {/* <span className="pr-2">
          <Button
            onClick={handleClickReports}
            className="btn-transition-none bg-neutral-danger text-danger font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
          >
            <span>
              <Reports />
            </span>
          </Button>
          <CustomPopover
            open={openReports}
            anchorEl={anchorEl2}
            handleClick={handleClickMenu}
            handleClose={handleCloseReports}
            title={'Reports'}
            submenu={reportMenu}
          />
        </span> */}
        {/* {!isMobileOrIpad && (
          <NavLink to="/connectors">
            <span className="pr-2">
              <Button className="bg-neutral-first text-first font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none">
                <span>
                  <ConnBox />
                </span>
              </Button>
            </span>
          </NavLink>
        )} */}
        {/* <span className="pr-2">
          <Button
            onClick={handleClickSupport}
            className="bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none"
          >
            <span>
              <Support />
            </span>
          </Button>
          <CustomPopover
            open={openSupport}
            anchorEl={anchorEl4}
            handleClick={handleClickMenu}
            handleClose={handleCloseSupport}
            title={'Support'}
            submenu={supportMenu}
          />
      </span> */}
        <span className="pr-2">
          <Button
            onClick={handleClickLocale}
            className="bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none"
          >
            <span>
              <LanguageIcon />
            </span>
          </Button>
          <CustomPopover
            open={openLocale}
            anchorEl={anchorEl6}
            handleClick={handleSetLocale}
            handleClose={handleCloseLocale}
            title={'Locale'}
            submenu={localMenu}
          />
        </span>
        {user?.role === 'ElectedOfficial' && (
          <NavLink to={`/${locale}/setting`}>
            <span className="pr-2">
              <Button className="bg-neutral-second font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none">
                <span>
                  <Settings style={{ fill: 'grey' }} />
                </span>
              </Button>
              <CustomPopover
                open={openSettings}
                anchorEl={anchorEl5}
                handleClick={handleClickMenu}
                handleClose={handleCloseSettings}
                title={'Settings'}
                submenu={settingsMenu}
              />
            </span>
          </NavLink>
        )}
      </div>
      <CustomDrawer
        open={open}
        openPosition="right"
        onClose={() => {
          if (!qrCode) {
            toggleDrawer()
          } else {
            toggleQrCode()
          }
        }}
        navTitle="citycare_webPortal"
        onInsert={() => {
          if (!qrCode) {
            toggleQrCode()
          }
        }}
      >
        {qrCode && (
          <div>
            <div className="flex-grow-1 text-center nav-title my-4 d-flex flex-column">
              <span className="my-3 d-block">{translate('login_desc')}</span>
              <span className="mb-4 d-block">
                {!scanned && <ResidentLogo fill="#1976D2" />}
                {scanned && (
                  <CircularProgress
                    variant="indeterminate"
                    value={0}
                    className="m-3 progress-xs"
                    color="secondary"
                  />
                )}
              </span>
            </div>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          </div>
        )}
        {!qrCode && (
          <div>
            <div className="d-flex flex-direction-center justify-content-center my-5">
              <div>
                <ComputerImage />
                <Phone height="55" />
              </div>
            </div>
            <div className="card m-3 rounded-sm">
              <div
                style={{ borderBottom: '6px #eeeff8  solid' }}
                className="pl-4 py-4 font-weight-bold font-size-lg"
              >
                {sessions.length > 0 && (
                  <span>{translate('logged_device')}</span>
                )}
                {sessions.length === 0 && (
                  <span>{translate('no_logged_device')}</span>
                )}
              </div>
              {sessions.map((item: any, index) => (
                <Grid
                  key={index}
                  container
                  className="py-1 justify-content-center align-items-center border-bottom border-light"
                >
                  <Grid item xs={2}>
                    {item.os === 'Windows' && <Windows />}
                    {item.os === 'Mac OS' && <Macos />}
                  </Grid>
                  <Grid item xs={10} className="font-size-sm">
                    <div className="m-2">
                      <span>
                        {translate('logged_active')} {getDate(item.timestamp)}
                      </span>
                      <br />
                      <span className="font-size-sm text-black-50">
                        {item.os} / {item.browser}
                      </span>
                    </div>
                  </Grid>
                  {/* <Grid item xs={2}>
                    <Button
                      onClick={() => {
                        console.log(item.id)
                        setCancelId(item.id)
                        toggleModal()
                        setModalTitle('Log out from this device?')
                      }}
                      className="btn-neutral-danger mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                    >
                      <Logout fill={modal ? '#ffffff' : '#FF3B30'} />
                    </Button>
                  </Grid> */}
                </Grid>
              ))}
              {sessions.length > 0 && (
                <Grid
                  container
                  className="p-3 justify-content-center align-items-center border-bottom border-light"
                >
                  <Grid item xs={1} />
                  <Grid item xs={9}>
                    {translate('logout_all_devices')}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => {
                        toggleModal()
                        setCancelId(null)
                        setModalTitle('Log out from all devices ?')
                      }}
                      className="btn-neutral-danger mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                    >
                      <Logout fill={modal ? '#ffffff' : '#FF3B30'} />
                    </Button>
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        )}
      </CustomDrawer>
      <Dialog
        open={modal}
        onClose={toggleModal}
        classes={{ paper: 'shadow-lg' }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogActions className="bg-white d-flex align-items-center justify-content-center">
          <Button className="btn-link text-primary" onClick={toggleModal}>
            {translate('action_cancel')}
          </Button>
          <Button
            className="btn-primary px-4 font-weight-bold"
            onClick={cancel}
          >
            {translate('logout_button')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HeaderDots
