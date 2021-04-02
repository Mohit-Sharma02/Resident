import React, { useCallback, useMemo, useRef, useState } from 'react'

import { Button, LinearProgress, Table, Tooltip } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useQuery } from 'react-query'

import BaseDrawer, { BaseDrawerActions } from 'src/components/BaseDrawer'
import { paginateData } from 'src/helpers/table'
import { usePage } from 'src/hooks/usePage'
import { getTask } from 'src/services/firebase/social/getTask'
import { TaskItem } from 'src/services/firebase/social/getTasks'
import { shortenString } from 'src/utils/shortenString'

import TaskContent from '../TaskContent'
import { ResidentPostsType } from '../types'

type ResidentPostsTableProps = {
  isLoading?: boolean
  data?: Array<TaskItem>
  type: ResidentPostsType
}

const ResidentPostsTable: React.FC<ResidentPostsTableProps> = ({
  isLoading,
  data,
  type,
}) => {
  const itemContentRef = useRef<BaseDrawerActions>(null)
  const [selectedItem, setSelectedItem] = useState<string>()
  const { entriesPerPage, page, setEntriesPerPage, setPage } = usePage()

  const paginatedData = useMemo(
    () => (data ? paginateData(data, page, entriesPerPage) : undefined),
    [data, page, entriesPerPage],
  )

  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['task', selectedItem, type],
    ({ queryKey }) =>
      getTask({
        postId: queryKey[1],
        type: queryKey[2],
      }),
    {
      keepPreviousData: false,
    },
  )

  const handleOpenItem = useCallback((itemId: string) => {
    setSelectedItem(itemId)
    itemContentRef.current?.open()
  }, [])

  const isDataAvailable = paginatedData && paginatedData.length

  return (
    <>
      {/* ITEM CONTENT DRAWER */}
      <BaseDrawer ref={itemContentRef} isLoading={isPostLoading}>
        <TaskContent data={postData!} />
      </BaseDrawer>

      {/* TABLE CONTENT */}

      <LinearProgress
        style={{ visibility: isLoading ? 'visible' : 'hidden' }}
      />
      <Table className="table table-alternate-spaced text-nowrap mb-0">
        <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
          <tr>
            <th className="bg-white text-left py-4 pr-4">ID</th>
            <th className="bg-white text-left py-4">Title</th>
            <th className="bg-white text-left py-4">Description</th>
            <th className="bg-white text-left py-4">Assigned By</th>
            <th className="bg-white text-left py-4">Assigned To</th>
            <th className="bg-white text-left py-4">Date create</th>
            <th className="bg-white text-left py-4">Status</th>
            <th className="bg-white text-left py-4">Department</th>
            <th className="bg-white text-left py-4">Attachment</th>
            <th className="bg-white text-left py-4">Due date</th>
          </tr>
        </thead>
        <tbody className="table-heading">
          {isDataAvailable
            ? paginatedData?.map((it) => (
                <>
                  <tr key={it.id}>
                    <td>
                      <span>{it.id}</span>
                    </td>
                    <td>
                      <Tooltip title={it?.title} arrow placement="top">
                        <Button
                          color="primary"
                          onClick={() => handleOpenItem(it.id)}
                        >
                          <span>
                            {it?.title && shortenString(it?.title, 15)}
                          </span>
                        </Button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title={it?.description} arrow placement="top">
                        <span>
                          {it?.description &&
                            shortenString(it?.description, 15)}
                        </span>
                      </Tooltip>
                    </td>
                    <td>
                      <span>{it?.assignedBy}</span>
                    </td>
                    <td>
                      <span>{it?.assignedTo}</span>
                    </td>
                    <td>
                      <span>{it?.createdOn}</span>
                    </td>
                    <td>
                      <span>{it?.status}</span>
                    </td>
                    <td>
                      <span>{it?.departament}</span>
                    </td>
                    <td>
                      <span>{it?.attachment}</span>
                    </td>
                    <td>
                      <span>{it?.dueDate}</span>
                    </td>
                  </tr>
                  <tr className="divider" />
                </>
              ))
            : ''}
        </tbody>
      </Table>
      {!isDataAvailable && !isLoading && (
        <span className="d-flex justify-content-center">No data Found</span>
      )}
      {isDataAvailable && !isLoading && (
        <div className="p-4 d-flex justify-content-center">
          <Pagination
            className="pagination-primary"
            variant="outlined"
            page={page}
            count={data?.entries?.totalResults}
            // renderItem={(item) => (
            //   <PaginationItem
            //     component={Link}
            //     to={handleChangePage(item.page)}
            //     {...item}
            //   />
            // )}
          />
        </div>
      )}
    </>
  )
}

export default ResidentPostsTable
