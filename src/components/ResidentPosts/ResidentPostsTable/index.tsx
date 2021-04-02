import React, { useCallback, useMemo, useRef, useState } from 'react'

import {
  Button,
  LinearProgress,
  Table,
  TablePagination,
  Tooltip,
} from '@material-ui/core'
import { format } from 'date-fns'
import { useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import CustomPopOver from 'src/components/CustomPopOver'
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from 'src/config/table'
import { paginateData } from 'src/helpers/table'
import { usePage } from 'src/hooks/usePage'
import { useTranslate } from 'src/locale'
import { getTypeStatus } from 'src/services/firebase/getTypeStatus'
import { getResidentPost } from 'src/services/firebase/social/getResidentPost'
import isMobile from 'src/utils/isMobile'
import { shortenString } from 'src/utils/shortenString'

import ResidentHoverPostContent from '../ResidentHoverPostContent'
import ResidentPostContentDrawer from '../ResidentPostContentDrawer'
import { ResidentPostsType } from '../types'

type ResidentPostsTableProps = {
  isLoading?: boolean
  data?: any
  type: ResidentPostsType
  forceUdate?: any
}

const ResidentPostsTable: React.FC<ResidentPostsTableProps> = ({
  isLoading,
  data,
  type,
  forceUdate,
}) => {
  const translate = useTranslate()
  const isMobileDevice = isMobile()
  const itemContentRef = useRef<BaseDrawerActions>(null)
  const [selectedItem, setSelectedItem] = useState<string>()
  const [selectedHoverItem, setSelectedHoverItem] = useState<string>()
  const { entriesPerPage, page, setEntriesPerPage, setPage } = usePage()

  const paginatedData = useMemo(
    () => (data ? paginateData(data, page, entriesPerPage) : undefined),
    [data, page, entriesPerPage],
  )

  const { data: hoverPostData, isLoading: isHoverPostLoading } = useQuery(
    ['residentPost', selectedHoverItem, type],
    ({ queryKey }) =>
      getResidentPost({
        postId: queryKey[1],
        type: queryKey[2],
      }),
    {
      keepPreviousData: false,
    },
  )

  const { data: postStatus, isLoading: isLoadingStatus } = useQuery(
    ['postStatus'],
    () => getTypeStatus(),
  )

  const residentPostSetting: any = JSON.parse(
    localStorage.getItem('ResidentPost') || '{}',
  )

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    itemId: any,
  ) => {
    if (!isMobileDevice) {
      setSelectedHoverItem(itemId)
      setAnchorEl(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleOpenItem = useCallback((itemId: string) => {
    setSelectedItem(itemId)
    itemContentRef.current?.open()
  }, [])

  const isDataAvailable = paginatedData && paginatedData.length

  return (
    <>
      {/* ITEM CONTENT DRAWER */}
      <ResidentPostContentDrawer
        ref={itemContentRef}
        type={type}
        postId={selectedItem}
        updated={() => {
          if (forceUdate) {
            forceUdate()
          }
        }}
      />

      {/* TABLE CONTENT */}
      <div className="clearfix" />
      <div className="divider" />
      <div className="pt-4 table-responsive">
        <LinearProgress
          style={{ visibility: isLoading ? 'visible' : 'hidden' }}
        />
        {Object.keys(residentPostSetting).length > 0 ? (
          <Table className="table table-responsive table-alternate-spaced text-nowrap mb-0">
            <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
              <tr>
                {residentPostSetting.postId && (
                  <th className="bg-white text-center pb-3">
                    {translate('ID')}
                  </th>
                )}
                {residentPostSetting.viewPostOnHover && (
                  <th className="bg-white text-left pb-3">
                    {translate('post_title')}
                  </th>
                )}
                {residentPostSetting.createdOn && (
                  <th className="bg-white text-left pb-3">
                    {translate('created_on')}
                  </th>
                )}
                {residentPostSetting.createdBy && (
                  <th className="bg-white text-left pb-3">
                    {translate('created_by')}
                  </th>
                )}
                {residentPostSetting.location && (
                  <th className="bg-white text-left pb-3">
                    {translate('location_live')}
                  </th>
                )}
                {residentPostSetting.category && (
                  <th className="bg-white text-left pb-3">
                    {translate('category')}
                  </th>
                )}
                {residentPostSetting.subCategory && (
                  <th className="bg-white text-left pb-3">
                    {translate('sub_category')}
                  </th>
                )}
                {residentPostSetting.postId && (
                  <th className="bg-white text-left pb-3">
                    {translate('allocated_to')}
                  </th>
                )}
                {residentPostSetting.status && (
                  <th className="bg-white text-left pb-3">
                    {translate('status_live')}
                  </th>
                )}
                {residentPostSetting.archived && (
                  <th className="bg-white text-left pb-3">
                    {translate('Archived')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="table-heading">
              {isDataAvailable
                ? paginatedData?.map((it: any) => (
                    <>
                      <tr key={it.id}>
                        {residentPostSetting.postId && (
                          <td className="text-center">
                            <Tooltip
                              title={it.postNumber}
                              arrow
                              placement="top"
                            >
                              <span>{it.postNumber}</span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.viewPostOnHover && (
                          <td className="text-left">
                            <Button
                              color="primary"
                              onMouseEnter={(e) => handlePopoverOpen(e, it.id)}
                              onMouseLeave={handlePopoverClose}
                              onClick={() => handleOpenItem(it.id)}
                            >
                              {shortenString(it.description, 18)}
                            </Button>
                            <CustomPopOver
                              anchorEl={anchorEl}
                              handlePopoverClose={handlePopoverClose}
                              open={open}
                              handlePopoverOpen={handlePopoverOpen}
                            >
                              <div className="popover-content">
                                <ResidentHoverPostContent
                                  data={hoverPostData}
                                  type={type}
                                />
                              </div>
                            </CustomPopOver>
                          </td>
                        )}
                        {residentPostSetting.createdOn && (
                          <td className="text-left">
                            <span>{format(it?.createdDate, 'MMM d, y')}</span>
                          </td>
                        )}
                        {residentPostSetting.createdBy && (
                          <td className="text-left">
                            <Tooltip
                              title={it.resident.name}
                              arrow
                              placement="top"
                            >
                              <span>
                                {it.resident.name &&
                                  shortenString(it.resident.name, 15)}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.location && (
                          <td className="text-left">
                            <Tooltip
                              title={it.formattedAddress}
                              arrow
                              placement="top"
                            >
                              <span>
                                {it.formattedAddress &&
                                  shortenString(it.formattedAddress, 15)}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.category && (
                          <td className="text-left">
                            <Tooltip
                              title={
                                it?.type?.label
                                  ? translate(it?.type?.label)
                                  : ''
                              }
                              arrow
                              placement="top"
                            >
                              <span>
                                {it.type.label &&
                                  shortenString(translate(it?.type?.label), 10)}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.subCategory && (
                          <td className="text-left">
                            <Tooltip
                              title={
                                it?.subtype?.label
                                  ? translate(it?.subtype?.label)
                                  : ''
                              }
                              arrow
                              placement="top"
                            >
                              <span>
                                {it?.subtype?.label &&
                                  shortenString(
                                    translate(it?.subtype?.label),
                                    10,
                                  )}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.postId && (
                          <td className="text-left">
                            <Tooltip
                              title={it.assignee?.department.name}
                              arrow
                              placement="top"
                            >
                              <span>
                                {it.assignee?.department.name &&
                                  shortenString(
                                    it.assignee?.department.name,
                                    10,
                                  )}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.status && (
                          <td className="text-left">
                            <Tooltip
                              title={
                                it?.status?.current?.status
                                  ? translate(it?.status?.current?.status)
                                  : ''
                              }
                              arrow
                              placement="top"
                            >
                              <span>
                                {it.status.current.status &&
                                  shortenString(
                                    translate(it?.status?.current?.status),
                                    10,
                                  )}
                              </span>
                            </Tooltip>
                          </td>
                        )}
                        {residentPostSetting.archived && (
                          <td className="text-left">
                            <span>
                              {it.isArchived.toString().toUpperCase()}
                            </span>
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
          <Table className="table table-responsive table-alternate-spaced text-nowrap mb-0">
            <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
              <tr>
                <th className="bg-white text-center pb-3">{translate('ID')}</th>
                <th className="bg-white text-left pb-3">
                  {translate('post_title')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('created_on')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('created_by')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('location_live')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('category')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('sub_category')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('allocated_to')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('status_live')}
                </th>
                <th className="bg-white text-left pb-3">
                  {translate('Archived')}
                </th>
              </tr>
            </thead>
            <tbody className="table-heading">
              {isDataAvailable
                ? paginatedData?.map((it: any) => (
                    <>
                      <tr key={it.id}>
                        <td className="text-center">
                          <Tooltip title={it.postNumber} arrow placement="top">
                            <span>{it.postNumber}</span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Button
                            color="primary"
                            onMouseEnter={(e) => handlePopoverOpen(e, it.id)}
                            onMouseLeave={handlePopoverClose}
                            onClick={() => handleOpenItem(it.id)}
                          >
                            {shortenString(it.description, 18)}
                          </Button>
                          <CustomPopOver
                            anchorEl={anchorEl}
                            handlePopoverClose={handlePopoverClose}
                            open={open}
                            handlePopoverOpen={handlePopoverOpen}
                          >
                            <div className="popover-content">
                              <ResidentHoverPostContent
                                data={hoverPostData}
                                type={type}
                              />
                            </div>
                          </CustomPopOver>
                        </td>
                        <td className="text-left">
                          {it?.createdDate && (
                            <span>{format(it?.createdDate, 'MMM d, y')}</span>
                          )}
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={it.resident?.name ? it.resident?.name : ''}
                            arrow
                            placement="top"
                          >
                            <span>
                              {it.resident.name &&
                                shortenString(it.resident.name, 15)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={it.formattedAddress}
                            arrow
                            placement="top"
                          >
                            <span>
                              {it.formattedAddress &&
                                shortenString(it.formattedAddress, 15)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={
                              it.type?.label ? translate(it?.type?.label) : ''
                            }
                            arrow
                            placement="top"
                          >
                            <span>
                              {it.type?.label &&
                                shortenString(translate(it?.type?.label), 10)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={
                              it.subtype.label
                                ? translate(it.subtype.label)
                                : ''
                            }
                            arrow
                            placement="top"
                          >
                            <span>
                              {it.subtype.label &&
                                shortenString(translate(it.subtype.label), 10)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={it.assignee?.department.name}
                            arrow
                            placement="top"
                          >
                            <span>
                              {it.assignee?.department.name &&
                                shortenString(it.assignee?.department.name, 10)}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <Tooltip
                            title={
                              it?.status?.current?.status
                                ? translate(it?.status?.current?.status)
                                : ''
                            }
                            arrow
                            placement="top"
                          >
                            <span>
                              {it?.status?.current?.status &&
                                shortenString(
                                  translate(it?.status?.current?.status),
                                  10,
                                )}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="text-left">
                          <span>{it.isArchived.toString().toUpperCase()}</span>
                        </td>
                      </tr>
                      <tr className="divider" />
                    </>
                  ))
                : ''}
            </tbody>
          </Table>
        )}
        {!isDataAvailable && !isLoading && (
          <span className="d-flex justify-content-center">No data Found</span>
        )}
      </div>
      {isDataAvailable && !isLoading && (
        <div className="d-flex align-items-center justify-content-center w-100">
          <TablePagination
            rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
            count={data?.length || 0}
            rowsPerPage={entriesPerPage}
            page={page - 1}
            onChangePage={(e, value) => setPage(value + 1)}
            onChangeRowsPerPage={(e) =>
              setEntriesPerPage(parseInt(e.target.value))
            }
            colSpan={9}
          />
        </div>
        // <div className="p-4 d-flex justify-content-center">
        //   <Pagination
        //     className="pagination-primary"
        //     variant="outlined"
        //     page={page}
        //     count={data && data.entries.totalResults}
        //     // renderItem={(item) => (
        //     //   <PaginationItem
        //     //     component={Link}
        //     //     to={getPageLink(item.page)}
        //     //     {...item}
        //     //   />
        //     // )}
        //   />
        // </div>
      )}
    </>
  )
}

export default ResidentPostsTable
