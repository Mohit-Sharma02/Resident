import React, { useCallback, useRef, useState } from 'react'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import { PageTitle } from 'src/layout-components'
import { useTranslate } from 'src/locale'

import { ReactComponent as RequestsIcon } from './icons/requests.svg'
import ResidentAction from './ResidentAction'
import { ResidentFilters, ResidentType } from './types'

const defaultFilterValues: ResidentFilters = {
  avatar: true,
  fullName: true,
  address: true,
  phoneNumber: true,
  memberSince: true,
  noOfPosts: true,
  noOfFollowers: true,
  votingEligibility: false,
  homeAdderess: false,
  username: false,
}

const SettingResident: React.FC = () => {
  const primaryColor = { fill: '#1976D2' }
  const filterData = localStorage.getItem('Resident')
    ? JSON.parse(localStorage.getItem('Resident') || '{}')
    : defaultFilterValues
  const [filters, setFilters] = useState<ResidentFilters>(filterData)
  const [type, setType] = useState<ResidentType>(ResidentType.REQUESTS)
  const translate = useTranslate()
  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const onSwitchChange = (name, value) => {
    const data = filters
    data[name] = value
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    localStorage.setItem('Resident', JSON.stringify(data))
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
          titleHeading="resident"
          titleDescription={translate('whatisnotmeasured')}
          icon={<RequestsIcon style={primaryColor} />}
        />
      </div>
      {/* FILTERS DRAWER */}

      {/* UPPER TABLE CONTENT */}
      {/* <ResidentTableFilters
        onChange={setType}
        isSettingPage={true}
        onOpenFilters={handleOpenFilters}
      /> */}
      <ResidentAction
        defaultValues={filters}
        onSubmit={(value) => setFilters(value)}
        type={type}
        onSwitchChange={(name, value) => onSwitchChange(name, value)}
      />
    </>
  )
}

export default SettingResident
