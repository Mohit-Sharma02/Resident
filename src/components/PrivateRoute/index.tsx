import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'
import { parse } from 'query-string'
import { useMutation } from 'react-query'
import { ClimbingBoxLoader } from 'react-spinners'

import { auth } from 'src/config/firebase'
import { useTranslate } from 'src/locale'
import { getAllSessions } from 'src/services/firebase/getSessions'
import { getUser } from 'src/services/firebase/getUser'
import { getUserCities } from 'src/services/firebase/getUserCities'
import { getUserDepartment } from 'src/services/firebase/getUserDepartment'
import { getUserProfile } from 'src/services/firebase/getUserProfile'

const siteUrl = 'https://resident.love'

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

const PrivateRoute = (props: any) => {
  const { children, ...rest } = props

  const { mutateAsync: mutateUser } = useMutation(getUser)
  const { mutateAsync: mutateGetSessions } = useMutation(getAllSessions)
  const { mutateAsync: mutateGetUserCities } = useMutation(getUserCities)
  const { mutateAsync: mutateGetUserProfile } = useMutation(getUserProfile)
  const { mutateAsync: mutateGetUserDepartment } = useMutation(
    getUserDepartment,
  )

  const { pathname } = useLocation()

  const [shouldRedirect, setShouldRedirect] = useState<boolean>(true)

  const redirectSite = () => {
    window.location.href = siteUrl
  }

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return user
  }

  const storeUserData = async (response: any, token: string) => {
    const userData: any = await mutateUser(response.user.uid)
    const userCities: any = await mutateGetUserCities(response.user.uid)
    const profile: any = await mutateGetUserProfile(response.user.uid)
    const departmentFetch: any = await mutateGetUserDepartment(
      userCities.work.city_id,
    )
    const department = departmentFetch.find(
      (it) => it.user_id === response.user.uid,
    )
    const displayName = `${userData.first_name} ${userData.last_name}`
    const photoUrl = userData.avatar_link ? userData.avatar_link : ''
    const storage: any = window.localStorage
    const data = {
      uid: response.user.uid,
      refreshToken: response.user.refreshToken,
      photoURL: response.user.photoURL ? response.user.photoURL : photoUrl,
      displayName: response.user.displayName
        ? response.user.displayName
        : displayName,
      email: response.user.email ? response.user.email : '',
      token: token,
      cityId: userCities.work.city_id,
      role: profile.role,
      department: department?.department_ids
        ? department?.department_ids[0]
        : '',
    }
    storage.setItem('user', JSON.stringify(data))
    setShouldRedirect(false)
  }

  const authUser = async () => {
    const { token } = parse(location.search)

    if (token) {
      await auth
        .signInWithCustomToken(`${token}`)
        .then((response: any) => {
          storeUserData(response, `${token}`)
        })
        .catch((error) => {
          console.log(error)
          redirectSite()
        })
    } else {
      const storage: any = window.localStorage
      const userData = JSON.parse(storage.getItem('user'))

      if (userData && userData.uid) {
        setShouldRedirect(false)
      } else {
        redirectSite()
      }
    }
  }

  const checkValidSession = async () => {
    const userData = JSON.parse(getUserData())
    const sessions = await mutateGetSessions(userData.uid)
    let sessionExists = true
    sessions.forEach((item) => {
      if (item.token === userData.token) {
        sessionExists = false
      }
    })

    if (sessionExists) {
      redirectSite()
    }
  }

  useEffect(() => {
    const { city_id } = parse(location.search)
    if (city_id) {
      const data = {
        cityId: city_id,
      }
      const storage: any = window.localStorage
      storage.setItem('user', JSON.stringify(data))
      setShouldRedirect(false)
    } else {
      authUser()
    }
  }, [])

  useEffect(() => {
    if (!shouldRedirect) {
      checkValidSession()
    }
  }, [pathname])

  return shouldRedirect ? <SuspenseLoading /> : children
}

export default PrivateRoute
