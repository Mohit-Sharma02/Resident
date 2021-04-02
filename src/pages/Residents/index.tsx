import React, { useCallback, useRef, useState } from 'react'

import {
  Avatar,
  Button,
  LinearProgress,
  Table,
  Tooltip,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import FilterDrawer from 'src/components/FilterDrawer'
import { DEFAULT_ROWS_PER_PAGE_NUMBER } from 'src/config/table'
import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import {
  GetSocialResidentsFilters,
  getSocialResidents,
} from 'src/services/firebase/social/getSocialResidents'
import { shortenString } from 'src/utils/shortenString'

import FilterBar from './FilterBar'
import ResidentsFiltersDrawerContent from './ResidentsFiltersDrawerContent'

const defaultFilterValues: GetSocialResidentsFilters = {
  age: [0, 100],
  location: '',
  votingEligibility: false,
  preferences: {
    showUsername: false,
    homeAddressHidden: false,
  },
}

const Residents: React.FC = () => {
  const translate = useTranslate()
  const [page, setPage] = React.useState(1)
  const [buttonClick, setButtonClick] = React.useState('')
  const [pageItem, setPageItem] = React.useState()
  const [prevPageItem, setPrevPageItem] = React.useState()
  const [filters, setFilters] = useState<GetSocialResidentsFilters>(
    defaultFilterValues,
  )
  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const { data: paginatedData, isLoading, isFetching } = useQuery(
    [
      'residents',
      filters,
      buttonClick === 'previous',
      buttonClick === 'next',
      pageItem,
    ],
    ({ queryKey }) =>
      getSocialResidents({
        filters: queryKey[1],
        isPrevious: queryKey[2],
        isNext: queryKey[3],
        item: queryKey[4],
      }),
    {
      keepPreviousData: true,
    },
  )

  const residentSetting: any = JSON.parse(
    localStorage.getItem('Resident') || '{}',
  )

  const isDataLoading = isLoading || isFetching

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  const isDataAvailable = paginatedData?.length > 0

  const handlePagination = (name) => {
    if (page >= 0) {
      if (name === 'next') {
        if (paginatedData.length >= 1) {
          setPage(page + 1)
          setPageItem(paginatedData[paginatedData.length - 1])
          setPrevPageItem(paginatedData[0])
        }
      } else {
        if (paginatedData.length === 0) {
          setPage(page - 1)
          setPageItem(prevPageItem)
        } else {
          setPage(page - 1)
          setPageItem(paginatedData[0])
        }
      }
      setButtonClick(name)
    }
  }

  return (
    <>
      <FilterDrawer
        onSubmit={(value) => setFilters(value)}
        ref={filterDrawerRef}
        defaultValues={defaultFilterValues}
      >
        <ResidentsFiltersDrawerContent />
      </FilterDrawer>
      <FilterBar onOpenFilters={handleOpenFilters} />
      <div className="clearfix" />
      <div className="divider" />
      <div className="pt-4 table-responsive">
        <LinearProgress
          style={{ visibility: isDataLoading ? 'visible' : 'hidden' }}
        />
        {Object.keys(residentSetting).length > 0 ? (
          <Table className="table table-alternate-spaced text-nowrap mb-0">
            <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
              <tr>
                {residentSetting.avatar && (
                  <th className="bg-white text-left p-4">
                    {translate('avatar')}
                  </th>
                )}
                {residentSetting.fullName && (
                  <th className="bg-white text-left p-4">
                    {translate('name')}
                  </th>
                )}
                {residentSetting.address && (
                  <th className="bg-white text-center p-4">
                    {translate('Address')}
                  </th>
                )}
                {residentSetting.phoneNumber && (
                  <th className="bg-white text-center p-4">
                    {translate('phoneno')}
                  </th>
                )}
                {residentSetting.memberSince && (
                  <th
                    className="bg-white text-center p-4"
                    style={{ width: '15%' }}
                  >
                    {translate('member_since')}
                  </th>
                )}
                {residentSetting.noOfPosts && (
                  <th className="bg-white text-right p-4">
                    {translate('no_of_posts')}
                  </th>
                )}
                {residentSetting.noOfFollowers && (
                  <th className="bg-white text-right p-4">
                    {translate('no_of_followers')}
                  </th>
                )}
                {residentSetting.votingEligibility && (
                  <th className="bg-white text-right p-4">
                    {translate('voting_eligibility')}
                  </th>
                )}
                {residentSetting.homeAdderess && (
                  <th className="bg-white text-right p-4">
                    {translate('homeaddressvisibility')}
                  </th>
                )}
                {residentSetting.username && (
                  <th className="bg-white text-right p-4">
                    {translate('using_real_username')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="table-heading">
              {isDataAvailable
                ? paginatedData?.map((it) => (
                    <>
                      <tr key={it.id}>
                        {residentSetting.avatar && (
                          <td className="text-left">
                            {it.avatar ? (
                              <Avatar src={it.avatar} />
                            ) : (
                              <Avatar
                                style={{
                                  backgroundColor: avatarService(it.name[0]),
                                  color: 'white',
                                }}
                              >
                                {it.name[0]}
                              </Avatar>
                            )}
                          </td>
                        )}
                        {residentSetting.fullName && (
                          <td className="text-left">
                            <span>{it.name}</span>
                          </td>
                        )}
                        {residentSetting.address && (
                          <td className="text-center">
                            <Tooltip title={it.address} arrow placement="top">
                              <span>
                                {it.address && shortenString(it.address, 20)}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentSetting.phoneNumber && (
                          <td className="text-center">
                            <span>{it.phone}</span>
                          </td>
                        )}
                        {residentSetting.memberSince && (
                          <td className="text-center">
                            <span>{it.memberSince.toDateString()}</span>
                          </td>
                        )}
                        {residentSetting.noOfPosts && (
                          <td className="text-center">
                            <span>{it.total}</span>
                          </td>
                        )}
                        {residentSetting.noOfFollowers && (
                          <td className="text-center">
                            <span>{it.numberOfFollowers}</span>
                          </td>
                        )}
                        {residentSetting.votingEligibility && (
                          <td className="text-center">
                            <span>
                              {it.eligible_to_vote.toString().toUpperCase()}
                            </span>
                          </td>
                        )}
                        {residentSetting.homeAdderess && (
                          <td className="text-center">
                            <span>{it.home_address_visibility}</span>
                          </td>
                        )}
                        {residentSetting.username && (
                          <td className="text-center">
                            <span>{it.pref_push_name}</span>
                          </td>
                        )}
                      </tr>
                      <tr className="divider" />
                    </>
                  ))
                : ''}
            </tbody>
          </Table>
        ) : (
          <Table className="table table-alternate-spaced text-nowrap mb-0">
            <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
              <tr>
                <th className="bg-white text-left p-4">
                  {translate('avatar')}
                </th>
                <th className="bg-white text-left p-4">{translate('name')}</th>
                <th className="bg-white text-center p-4">
                  {translate('Address')}
                </th>
                <th className="bg-white text-center p-4">
                  {translate('phoneno')}
                </th>
                <th
                  className="bg-white text-center p-4"
                  style={{ width: '15%' }}
                >
                  {translate('member_since')}
                </th>
                <th className="bg-white text-right p-4">
                  {translate('no_of_posts')}
                </th>
                <th className="bg-white text-right p-4">
                  {translate('no_of_followers')}
                </th>
                <th className="bg-white text-right p-4">
                  {translate('voting_eligibility')}
                </th>
                <th className="bg-white text-right p-4">
                  {translate('homeaddressvisibility')}
                </th>
                <th className="bg-white text-right p-4">
                  {translate('using_real_username')}
                </th>
              </tr>
            </thead>
            <tbody className="table-heading">
              {isDataAvailable
                ? paginatedData?.map((it) => (
                    <>
                      <tr key={it.id}>
                        <td className="text-left">
                          {it.avatar ? (
                            <Avatar src={it.avatar} />
                          ) : (
                            <Avatar
                              style={{
                                backgroundColor: avatarService(it.name[0]),
                                color: 'white',
                              }}
                            >
                              {it.name[0]}
                            </Avatar>
                          )}
                        </td>
                        <td className="text-left">
                          <span>{it.name}</span>
                        </td>
                        <td className="text-center">
                          <Tooltip title={it.address} arrow placement="top">
                            <span>
                              {it.address && shortenString(it.address, 20)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-center">
                          <span>{it.phone}</span>
                        </td>
                        <td className="text-center">
                          <span>{it.memberSince.toDateString()}</span>
                        </td>
                        <td className="text-center">
                          <span>{it.total}</span>
                        </td>
                        <td className="text-center">
                          <span>{it.numberOfFollowers}</span>
                        </td>
                        <td className="text-center">
                          <span>
                            {it.eligible_to_vote.toString().toUpperCase()}
                          </span>
                        </td>
                        <td className="text-center">
                          <span>{it.home_address_visibility}</span>
                        </td>
                        <td className="text-center">
                          <span>{it.pref_push_name}</span>
                        </td>
                      </tr>
                      <tr className="divider" />
                    </>
                  ))
                : ''}
            </tbody>
          </Table>
        )}
        {!isDataAvailable && !isDataLoading && (
          <span className="d-flex justify-content-center">No data Found</span>
        )}
      </div>
      {isDataAvailable && !isDataLoading && (
        <div className="d-flex py-3">
          <Button
            variant="outlined"
            color="primary"
            name="previous"
            disabled={page < 1}
            onClick={() => handlePagination('previous')}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            className="ml-auto"
            onClick={() => handlePagination('next')}
            variant="outlined"
            disabled={
              paginatedData &&
              paginatedData.length < DEFAULT_ROWS_PER_PAGE_NUMBER &&
              page > 1
            }
            name="next"
            color="primary"
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}

export default Residents
