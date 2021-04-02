import React, { useCallback, useRef, useState } from 'react'

import {
  Avatar,
  LinearProgress,
  ListItem,
  Table,
  TablePagination,
} from '@material-ui/core'
import { useQuery } from 'react-query'

import { BaseDrawerActions } from 'src/components/BaseDrawer'
import FilterDrawer from 'src/components/FilterDrawer'
import { usePage } from 'src/hooks/usePage'
import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import { getSocialEmployees } from 'src/services/firebase/social/getSocialEmployees'

import EmployeesFiltersDrawerContent from './EmployeesFiltersDrawerContent'
import FilterBar from './FilterBar'

const Employees: React.FC = () => {
  const [filters, setFilters] = useState<any>()
  const translate = useTranslate()
  const primaryColor = { fill: '#1976D2' }
  const [search, setSearch] = useState<string>('')
  const filterDrawerRef = useRef<BaseDrawerActions>(null)

  const rowsPerPageOptions = [10, 25, 50]
  const defaultFilterValues = {
    employeeName: '',
    department: '',
    noTaskAssigned: [0, 100],
    currentStatus: true,
  }

  const { entriesPerPage, page, setLocation } = usePage()

  const { data, isLoading, isFetching } = useQuery(
    ['employees', page, entriesPerPage, search, filters],
    ({ queryKey }) =>
      getSocialEmployees({
        page: queryKey[1],
        limit: queryKey[2],
        filters: {
          search: queryKey[3],
          ...queryKey[4],
        },
      }),
    {
      keepPreviousData: true,
    },
  )

  const handleChangePage = useCallback(
    (newPage: number) => {
      window.scrollTo(0, 0)
      setLocation({
        page: newPage,
      })
    },
    [setLocation],
  )

  const handleChangeRowsPerPage = useCallback(
    (newRowsPerPage: number) => {
      window.scrollTo(0, 0)
      setLocation({
        entriesPerPage: newRowsPerPage,
        page: 1,
      })
    },
    [setLocation],
  )

  const isDataLoading = isLoading || isFetching

  const handleOpenFilters = useCallback(() => {
    if (filterDrawerRef.current) {
      filterDrawerRef.current.toggle()
    }
  }, [])

  const isDataAvailable = data?.entries.length

  return (
    <>
      <FilterDrawer
        onSubmit={(value) => setFilters(value)}
        ref={filterDrawerRef}
        defaultValues={defaultFilterValues}
      >
        <EmployeesFiltersDrawerContent />
      </FilterDrawer>
      <FilterBar
        onChange={(value) => setSearch(value)}
        onOpenFilters={handleOpenFilters}
      />
      <div className="clearfix" />
      <div className="divider" />
      <div className="pt-4 table-responsive">
        <LinearProgress
          style={{ visibility: isDataLoading ? 'visible' : 'hidden' }}
        />
        <Table className="table table-alternate-spaced text-nowrap mb-0">
          <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
            <tr>
              <th className="bg-white text-left p-4">
                {translate('employee')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('phonenumber')}
              </th>
              <th className="bg-white text-center p-4">
                {translate('department_name')}
              </th>
              <th className="bg-white text-center p-4">
                {translate('task_assigned')}
              </th>
              <th className="bg-white text-center p-4">
                {translate('current_status')}
              </th>
            </tr>
          </thead>
          <tbody className="table-heading">
            {isDataAvailable
              ? data &&
                data.entries.map((it, index) => (
                  <>
                    <tr key={index}>
                      <td>
                        <ListItem>
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
                          <span className="ml-1">{it.name}</span>
                        </ListItem>
                      </td>
                      <td>
                        <span>{it.phone_number}</span>
                      </td>
                      <td>
                        <span>{it.department}</span>
                      </td>
                      <td>
                        <span>{it.tasks}</span>
                      </td>
                      <td>
                        <span>{it.status}</span>
                      </td>
                    </tr>
                    <tr className="divider" />
                  </>
                ))
              : ''}
          </tbody>
        </Table>
        {!isDataAvailable && !isDataLoading && (
          <span className="d-flex justify-content-center">No data Found</span>
        )}
      </div>
      {isDataAvailable && !isDataLoading && (
        <div className="d-flex align-items-center justify-content-center w-100">
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            count={data?.totalResults || 0}
            rowsPerPage={entriesPerPage}
            page={page - 1}
            onChangePage={(e, value) => handleChangePage(value + 1)}
            onChangeRowsPerPage={(e) =>
              handleChangeRowsPerPage(parseInt(e.target.value))
            }
            colSpan={8}
          />
        </div>
        // <div className="p-4 d-flex justify-content-center">
        //   <Pagination
        //     className="pagination-primary"
        //     variant="outlined"
        //     page={page}
        //     count={data?.entries.totalResults}
        //     // renderItem={(item) => (
        //     //   <PaginationItem
        //     //     component={Link}
        //     //     to={handleChangePage(item.page)}
        //     //     {...item}
        //     //   />
        //     // )}
        //   />
        // </div>
      )}
    </>
  )
}

export default Employees
