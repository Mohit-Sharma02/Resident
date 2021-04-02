import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
} from '@material-ui/core'
import { PaginationItem, Skeleton } from '@material-ui/lab'
import Pagination from '@material-ui/lab/Pagination'

import { usePage } from 'src/hooks/usePage'

import CustomLinearProgressBar from '../ProgressBar'

type BaseDataTableProps = {
  header?: JSX.Element
  isLoading?: boolean
  error?: Error | null
  page: number
  totalPages?: number
  loadingRows?: number
  columns: number
  refetch?: () => void
}

/**
 *
 * @todo Add error handling
 * @todo Add entries per page
 */
const BaseDataTable: React.FC<BaseDataTableProps> = ({
  header,
  children,
  page,
  totalPages = 1,
  isLoading,
  loadingRows = 10,
  columns,
  error,
  refetch,
}) => {
  const { setLocation, getLocation, entriesPerPage } = usePage()

  const getPageLink = useCallback(
    (page: number) => {
      return getLocation({ page })
    },
    [getLocation],
  )

  const updateEntriesPerPage = useCallback(
    (entriesPerPage) => {
      setLocation({ page: 1, entriesPerPage })
    },
    [setLocation],
  )

  return (
    <Card className="card-box mb-spacing-6-x2 overflow-auto">
      <div className="table-responsive-xxl bt-0">
        {isLoading && (
          <CustomLinearProgressBar
            variant="indeterminate"
            className="progress-bar-first progress-sm mb-0"
          />
        )}
        <Table className="table table-hover text-nowrap mb-0">
          {header && <thead>{header}</thead>}
          <tbody>
            {isLoading ? (
              Array.from(Array(loadingRows)).map((_, index) => (
                <tr key={index}>
                  <th colSpan={columns}>
                    <Skeleton height={30} />
                  </th>
                </tr>
              ))
            ) : error ? (
              <tr>
                <th colSpan={columns}>
                  <div className="py-4">
                    <p className="text-danger font-weight-normal mb-2 text-center">
                      {error.message}
                    </p>
                    {refetch && (
                      <Button
                        size="small"
                        className="btn-neutral-first d-block mx-auto"
                        onClick={refetch}
                      >
                        <span className="btn-wrapper--label">
                          Click to retry
                        </span>
                      </Button>
                    )}
                  </div>
                </th>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </Table>
      </div>

      {!isLoading && !error && (
        <div className="card-footer py-3 d-flex justify-content-between">
          <Pagination
            className="pagination-primary"
            variant="outlined"
            page={page}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={getPageLink(item.page)}
                {...item}
              />
            )}
          />
          <div className="d-flex align-items-center">
            <span>Show</span>
            <FormControl size="small" variant="outlined" className="mx-3">
              <InputLabel id="select-entries-label">Entries</InputLabel>
              <Select
                labelId="select-entries-label"
                id="select-entries"
                value={entriesPerPage}
                onChange={(e) => updateEntriesPerPage(e.target.value)}
                label="Entries"
              >
                <MenuItem className="mx-2" value={5}>
                  5
                </MenuItem>
                <MenuItem className="mx-2" value={10}>
                  10
                </MenuItem>
                <MenuItem className="mx-2" value={25}>
                  25
                </MenuItem>
                <MenuItem className="mx-2" value={50}>
                  50
                </MenuItem>
              </Select>
            </FormControl>
            <span>entries</span>
          </div>
        </div>
      )}
    </Card>
  )
}

export default BaseDataTable
