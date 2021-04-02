import React, { useCallback, useRef, useState } from 'react'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import { ReactComponent as RequestsIcon } from 'src/components/ResidentPosts/ResidentPostsTableFilters/ResidentPostsTypeList/icons/requests.svg'
import { PageTitle } from 'src/layout-components'
import { useTranslate } from 'src/locale'

import ResidentPostAction from './ResidentPostAction'
import { ResidentPostsFilters, ResidentPostsType } from './types'

const defaultFilterValues: ResidentPostsFilters = {
  createdOn: true,
  department: true,
  postId: true,
  createdBy: true,
  location: true,
  category: true,
  subCategory: true,
  viewPostOnHover: true,
  status: true,
  archived: false,
}

const SettingResidentPosts: React.FC = () => {
  const primaryColor = { fill: '#1976D2' }
  const filterData = localStorage.getItem('ResidentPost')
    ? JSON.parse(localStorage.getItem('ResidentPost') || '{}')
    : defaultFilterValues
  const [filters, setFilters] = useState<ResidentPostsFilters>(filterData)
  const [type, setType] = useState<ResidentPostsType>(
    ResidentPostsType.REQUESTS,
  )
  const translate = useTranslate()
  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const handleSubmit = (value) => {
    console.log('value', value)
  }

  const onSwitchChange = (name, value) => {
    const data = filters
    data[name] = value
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    localStorage.setItem('ResidentPost', JSON.stringify(data))
  }

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  return (
    <>
      <div className="pb-5">
        <PageTitle
          titleHeading="resident_posts"
          titleDescription={translate('whatisnotmeasured')}
          icon={<RequestsIcon style={primaryColor} />}
        />
      </div>
      {/* FILTERS DRAWER */}

      {/* UPPER TABLE CONTENT */}
      {/* <ResidentPostsTableFilters
        onChange={setType}
        isSettingPage={true}
        onOpenFilters={handleOpenFilters}
      /> */}
      <ResidentPostAction
        defaultValues={filters}
        onSubmit={(value) => handleSubmit(value)}
        type={type}
        onSwitchChange={(name, value) => onSwitchChange(name, value)}
      />
    </>
  )
}

export default SettingResidentPosts
