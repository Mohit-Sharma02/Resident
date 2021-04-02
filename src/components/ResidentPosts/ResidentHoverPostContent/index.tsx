import React, { useEffect, useState } from 'react'

import moment from 'moment'

import { Icon } from 'src/components/Icon'
import { formatDate } from 'src/helpers/formatDate'
import { useTranslate } from 'src/locale'
import { ResidentPostItem } from 'src/services/firebase/social/getResidentPosts'

import AvatarName from '../ResidentPostContent/AvatarName'
import '../ResidentPostContent/ToDoTabContent/styles.scss'

type ResidentHoverPostContentProps = {
  data?: ResidentPostItem
  postStatus?: any
  type: string
  updated?: any
  isPopover?: boolean
}

const ResidentHoverPostContent: React.FC<ResidentHoverPostContentProps> = ({
  data,
  type,
}) => {
  const translate = useTranslate()
  const [role, setRole] = useState<string>()
  const [userDepartmentId, setUserDepartmentId] = useState<string>()
  const [departmentId, setDepartmentId] = useState<string>()

  const getUserData = () => {
    const storage: any = window.localStorage
    const user = storage.getItem('user')

    return JSON.parse(user)
  }

  useEffect(() => {
    if (!data) {
      return
    }

    const user = getUserData()
    setRole(user?.role)
    setUserDepartmentId(user?.department)
    setDepartmentId(data?.assignee?.department?.id)
  }, [data])

  if (!data) {
    return <></>
  }

  const fixMarkerImage = (status, icon) => {
    const type = status.split('_')[status.split('_').length - 1]

    return icon.replace('black', type)
  }

  const statusIcon = fixMarkerImage(
    data.status?.current?.status,
    data.type?.icon,
  )

  const getDaysAgo = () => {
    const daysAgo = moment().diff(moment(data.createdDate), 'days')
    const hoursAgo = moment().diff(moment(data.createdDate), 'hours')
    if (daysAgo === 0) {
      return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`
    } else {
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
    }
  }

  return (
    <>
      <div
        className="py-2 px-4 mb-4 d-flex flex-row"
        style={{
          backgroundColor: '#F9FBFD',
          marginLeft: -15,
          marginRight: -25,
        }}
      >
        <div className="mr-1" style={{ flex: 1 }}>
          <AvatarName
            src={data.resident.avatar}
            name={data.resident.name}
            date={formatDate(data.createdDate)}
          />
        </div>
        <div className="d-flex flex-orow align-items-center justfy-content-center">
          <div className="text-right">
            <div className="font-size-md title-color font-weight bold">
              {translate(data.status?.current?.status)}
            </div>
            <div
              style={{ fontSize: '10px' }}
              className="font-size-xs text-secondary-text"
            >
              {getDaysAgo()}
            </div>
          </div>
          <div
            style={{ backgroundColor: '#EFF3F4' }}
            className="ml-2 rounded-circle p-1"
          >
            {statusIcon && (
              <Icon height="25" name={`svg_icons/${statusIcon}`} />
            )}
          </div>
        </div>
      </div>
      <div className="font-weight-600 title-color font-size-sm mb-2">
        {data.formattedAddress}
      </div>
      <p className="font-size-sm title-color font-weight-500 mb-4">
        {data.description}
      </p>
      <img
        src={data.image}
        className={'pop-img'}
        style={{
          marginLeft: -25,
          marginRight: -25,
          width: 'calc(100% + 50px)',
        }}
      />
    </>
  )
}

export default ResidentHoverPostContent
