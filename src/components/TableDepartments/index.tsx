import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import produce from 'immer'
import { parse, stringify } from 'query-string'

import CustomLinearProgressBar from '../ProgressBar'
import DesktopTable from './Desktop'
import MobileTable from './Mobile'

import './styles.scss'

type Props = {
  state?: any
  props?: any
  data?: any
}

const TableDepartments: React.FC<Props> = ({ state, props, data }) => {
  const {
    isLoadingMutateDepartment,
    isLoadingDepartment,
    isLoadingEmployees,
    isLoadingDepartmentById,
    openSelectManager,
    currentDepartmentId,
    page,
    pages,
    division,
  } = state
  const {
    classes,
    icons,
    toggleInviteNewUserDrawer,
    handleSelectManager,
    toggleSelectMangerDrawer,
    handleStatusDepartment,
    handleSubmitInviteManager,
  } = props
  const { departmentData, employeeData, currentDepartment } = data

  const location = useLocation()

  const getPageLink = useCallback(
    (page) => {
      return produce(location, (draftLocation) => {
        const search = parse(draftLocation.search)
        search.page = page.toString()

        draftLocation.search = stringify(search)
      })
    },
    [location],
  )

  return (
    <>
      {isLoadingDepartment ? (
        <CustomLinearProgressBar
          variant="indeterminate"
          className="progress-bar-first progress-sm"
        />
      ) : (
        <>
          <div className="desktop">
            <DesktopTable
              state={{
                page,
                pages,
                division,
                openSelectManager,
                isLoadingDepartmentById,
                currentDepartmentId,
                isLoadingEmployees,
                isLoadingDepartment,
                isLoadingMutateDepartment,
              }}
              props={{
                classes,
                icons,
                getPageLink,
                handleSelectManager,
                handleStatusDepartment,
                toggleSelectMangerDrawer,
                handleSubmitInviteManager,
                toggleInviteNewUserDrawer,
              }}
              data={{
                currentDepartment,
                departmentData,
                employeeData,
              }}
            />
          </div>
          <div className="mobile">
            <MobileTable
              state={{
                page,
                pages,
                isLoadingDepartment,
                isLoadingEmployees,
                isLoadingMutateDepartment,
              }}
              props={{
                classes,
                icons,
                getPageLink,
                handleSelectManager,
                handleStatusDepartment,
                handleSubmitInviteManager,
                toggleInviteNewUserDrawer,
              }}
              data={{
                departmentData,
                employeeData,
              }}
            />
          </div>
        </>
      )}
    </>
  )
}

export default TableDepartments
