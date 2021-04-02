import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from '@material-ui/core'
import QRCode from 'qrcode.react'

import { useTranslate } from 'src/locale'
import { authSignIn } from 'src/store/auth/actions'
import { RootState } from 'src/store/rootReducer'

// import ImageBackground from '../../assets/images/background/login.jpg'
import IconAppStore from '../../assets/images/icons/apple_store.svg'
import IconGooglePlay from '../../assets/images/icons/google_play.svg'
import IconQRCode from '../../assets/images/icons/qr_code.svg'
import IconSettings from '../../assets/images/icons/settings.svg'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const { user, loading, error } = useSelector((state: RootState) => state.auth)

  const [state, setState] = useState({
    keepSignedIn: false,
  })

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked })
  }

  const { keepSignedIn } = state

  const fakeLogin = useCallback(() => {
    dispatch(
      authSignIn({
        user: {
          email: 'john.doe@example.com',
          name: 'John Doe',
        },
      }),
    )
  }, [dispatch])

  useEffect(() => {
    fakeLogin()
  }, [fakeLogin])

  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            {/* <div
              className="bg-composed-wrapper--image"
              style={{ backgroundImage: 'url(' + ImageBackground + ')' }}
            /> */}
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container maxWidth="md" disableGutters>
                <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      md={7}
                      className="d-flex pl-sm-5 pr-sm-3 justify-content-center flex-column"
                    >
                      <div id="login-status">
                        {loading ? (
                          <p>{translate('loading_wait')}</p>
                        ) : error ? (
                          <>
                            <p>Error: {error.message}</p>
                            <button type="button" onClick={fakeLogin}>
                              {translate('retry')}
                            </button>
                          </>
                        ) : null}
                        {user && <p>{translate('logged_in_msg')}</p>}
                      </div>
                      <div className="mt-5">
                        <h2 className="display-4 mb-3 text-primary font-weight-500">
                          {translate('use_resident_web')}
                        </h2>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-3 typography-subtitle1">
                            {translate('openresidentphone')}
                          </li>
                          <li className="mb-3 typography-subtitle1">
                            {translate('tap_key')}{' '}
                            <span className="text-primary">
                              {translate('web_login_pt3')}{' '}
                              <img className="px-1" src={IconSettings} />
                            </span>{' '}
                            {translate('web_login_pt4')}{' '}
                            <span className="text-primary">
                              {translate('web_login_pt5')}{' '}
                            </span>
                          </li>
                          <li className="typography-subtitle1">
                            {translate('pointphone')}
                          </li>
                        </ul>
                      </div>
                      <div className="mt-45">
                        {/* <a href="#" className="typography-link">
                          <img className="pr-2" src={IconSupport} />
                          Need help to get started?
                        </a> */}
                      </div>
                      <div className="mt-45 typography-body2">
                        {translate('dont_have_facebook')}
                      </div>
                      <div className="mb-5">
                        <img className="mt-2 mr-2" src={IconAppStore} />
                        <img className="mt-2" src={IconGooglePlay} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      md={5}
                      className="d-flex py-5 pr-sm-5 align-items-center flex-column"
                    >
                      <QRCode
                        value={'JWT_TOKEN'}
                        size={220}
                        bgColor={'#ffffff'}
                        fgColor={'#1976d2'}
                        level={'L'}
                        includeMargin={false}
                        renderAs={'svg'}
                        imageSettings={{
                          src: IconQRCode,
                          x: undefined,
                          y: undefined,
                          height: 62,
                          width: 54,
                          excavate: true,
                        }}
                      />

                      <div className="mt-4">
                        <FormControlLabel
                          classes={{
                            label: 'typography-link',
                          }}
                          control={
                            <Checkbox
                              checked={keepSignedIn}
                              onChange={handleChange('keepSignedIn')}
                              value="keepSignedIn"
                            />
                          }
                          label={translate('keep_signed_in')}
                        />
                      </div>

                      <div className="mt-4 text-center">
                        <span className="typography-body2">
                          {translate('by_continuing_you_agree')}
                          <br /> {translate('terms_policy_privacy')}
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
