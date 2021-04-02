/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  Button,
  Container,
  InputAdornment,
  Switch,
  Table,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { BeatLoader } from 'react-spinners'

import { useTranslate } from 'src/locale'
import { shortenString } from 'src/utils/shortenString'

import { ReactComponent as UserInvite } from '../../assets/svgs/departments/user_invite_icon.svg'
import { ReactComponent as Manager } from '../../assets/svgs/departments/user_teammanager_icon.svg'
import CustomDrawer from '../CustomDrawer'
type Props = {
  props?: any
  state?: any
  data?: any
}
const DesktopTable: React.FC<Props> = ({ state, props, data }) => {
  const translate = useTranslate()
  const {
    isLoadingMutateDepartment,
    page,
    pages,
    openSelectManager,
    isLoadingDepartmentById,
  } = state

  const {
    icons,
    classes,
    getPageLink,
    handleSelectManager,
    toggleInviteNewUserDrawer,
    toggleSelectMangerDrawer,
    handleStatusDepartment,
  } = props
  const { departmentData, employeeData, currentDepartment } = data
  const iconStyleFill = {
    fill: '#1976D2',
  }

  return (
    <>
      <div className="clearfix" />
      <div className="divider" />
      <div className="pt-4 table-responsive">
        {/* <LinearProgress
          style={{ visibility: isLoading ? 'visible' : 'hidden' }}
        /> */}
        <Table className="table table-responsive table-alternate-spaced text-nowrap mb-0">
          <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
            <tr>
              <th className="bg-white text-left p-4">
                {translate('department_name')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('description')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('department_head')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('no_of_employees')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('no_of_active_tasks')}
              </th>
              <th className="bg-white text-left p-4">
                {translate('no_of_completed_tasks')}
              </th>
            </tr>
          </thead>
          <tbody className="table-heading">
            {departmentData?.map((division, index) => {
              const iconName = division.department
                ? division.department.replace(/\s+/g, '')
                : ''

              return (
                <>
                  <tr key={index}>
                    <td
                      className="py-5 pl-4 d-flex flex-row"
                      onClick={() => toggleSelectMangerDrawer(division.id)}
                    >
                      <>
                        <span className="mr-2">{icons && icons[iconName]}</span>
                        <Tooltip
                          title={translate(division?.department_label)}
                          arrow
                          placement="top"
                        >
                          <h6 className="text-primary department-name">
                            {division?.department_label &&
                              shortenString(
                                translate(division?.department_label),
                                10,
                              )}
                          </h6>
                        </Tooltip>
                      </>
                    </td>
                    <td className="text-wrap px-3 py-4 description">
                      <Tooltip
                        title={translate(division?.description_label)}
                        arrow
                        placement="top"
                      >
                        <span>
                          {division?.description_label &&
                            shortenString(
                              translate(division?.description_label),
                              15,
                            )}
                        </span>
                      </Tooltip>
                    </td>

                    {division?.manager && division?.manager?.name !== '' ? (
                      <td className="avatar px-3">
                        <div className="d-flex align-items-center">
                          {division.manager?.avatar && (
                            <div className="avatar-icon-wrapper avatar-icon-lg mr-3">
                              <div className="avatar-icon">
                                <img alt="..." src={division.manager?.avatar} />
                              </div>
                            </div>
                          )}
                          <div className="d-flex flex-column justify-content-center">
                            <Tooltip
                              title={division?.manager?.name}
                              arrow
                              placement="top"
                            >
                              <h6>
                                {division?.manager?.name &&
                                  shortenString(division?.manager?.name, 10)}
                              </h6>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <td className="">
                        <Button
                          variant="text"
                          onClick={() => toggleSelectMangerDrawer(division.id)}
                          className="btn-pill m-0 btn-outline-success"
                        >
                          {translate('assign_manager')}
                        </Button>
                      </td>
                    )}
                    <td className="text-left px-5">
                      <span>{division?.department_employee_counts}</span>
                    </td>
                    <td className="text-left px-5">
                      <span>{division.posts?.active}</span>
                    </td>
                    <td className="text-left px-5">
                      <span>{division.posts?.completed}</span>
                    </td>
                  </tr>
                  <tr className="divider" />
                </>
              )
            })}
          </tbody>
        </Table>
      </div>
      {/* <div className="pagination pb-3 d-flex justify-content-center rounded-0">
        <Pagination
          className="pagination-primary"
          variant="outlined"
          page={page}
          count={pages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={getPageLink(item.page)}
              {...item}
            />
          )}
        />
      </div> */}

      <CustomDrawer
        title={`${translate('action_edit')} ${
          currentDepartment && currentDepartment.department
        } ${translate('department_name')}`}
        open={openSelectManager}
        description={currentDepartment && currentDepartment.description_label}
        openPosition="right"
        toggleDrawer={() => toggleSelectMangerDrawer()}
      >
        {isLoadingDepartmentById ? (
          <div className="d-flex align-items-center justify-content-center">
            <BeatLoader color={'var(--primary)'} loading={true} />
          </div>
        ) : (
          <Container>
            {currentDepartment && (
              <div className="desktop-drawer">
                {isLoadingMutateDepartment ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <BeatLoader color={'var(--primary)'} loading={true} />
                  </div>
                ) : (
                  <>
                    <span className="float-right">
                      <Switch
                        name="is_active"
                        checked={currentDepartment.is_active}
                        onChange={(e) =>
                          handleStatusDepartment(e, currentDepartment.id)
                        }
                        className="switch-small toggle-switch-success"
                      />
                    </span>
                    <div className="d-flex flex-column justify-content-center font-size-sm pb-2">
                      <span className="status">{translate('status_live')}</span>
                      <span
                        className={
                          currentDepartment.is_active
                            ? 'text-success'
                            : 'text-danger'
                        }
                      >
                        {currentDepartment.is_active
                          ? translate('active_caps')
                          : translate('inactive')}
                      </span>
                    </div>
                    <div>
                      <span className="font-size-sm">
                        {translate('manager')}
                      </span>
                      <div className="mt-2">
                        <Autocomplete
                          id="combo-box-demo"
                          classes={classes}
                          options={employeeData}
                          onChange={(e, value) => {
                            handleSelectManager(e, value, currentDepartment.id)
                          }}
                          disableClearable
                          renderOption={(option) => (
                            <>
                              <div className="d-flex align-items-center">
                                {option.avatar && (
                                  <div className="avatar-icon-wrapper mr-2">
                                    <div className="avatar-icon">
                                      <img alt="..." src={option.avatar} />
                                    </div>
                                  </div>
                                )}
                                {option.name.length > 0 && (
                                  <span className="text-black" title="...">
                                    {option.name}
                                  </span>
                                )}
                                {option.idx === 'invite' && (
                                  <Button
                                    onClick={() =>
                                      toggleInviteNewUserDrawer(
                                        currentDepartment.department,
                                      )
                                    }
                                    onMouseDown={() =>
                                      toggleInviteNewUserDrawer(
                                        currentDepartment.department,
                                      )
                                    }
                                    className="w-100"
                                    fullWidth
                                  >
                                    <span className="mr-2">
                                      <UserInvite style={iconStyleFill} />
                                    </span>
                                    <span className="text-primary">
                                      {translate('invite_new_user')}
                                    </span>
                                  </Button>
                                )}
                              </div>
                            </>
                          )}
                          getOptionLabel={(option: any) => option.name}
                          renderInput={(params) => (
                            <>
                              <TextField
                                {...params}
                                fullWidth
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Manager style={iconStyleFill} />
                                    </InputAdornment>
                                  ),
                                }}
                                label={translate('user_deparmentmanager')}
                                variant="outlined"
                                placeholder={`${translate('Search_live')}...`}
                              />
                            </>
                          )}
                        />
                      </div>
                      <br />
                      {currentDepartment?.description_label && (
                        <div className="py-3">
                          <span className="font-size-sm">
                            {translate('description')}
                          </span>
                          <p className="font-size-sm description">
                            {translate(currentDepartment?.description_label)}
                          </p>
                        </div>
                      )}
                      <div className="d-flex align-items-center">
                        {currentDepartment.manager?.avatar && (
                          <div className="avatar-icon-wrapper avatar-icon-xs mr-3">
                            <div className="avatar-icon">
                              <img
                                alt="..."
                                src={currentDepartment.manager?.avatar}
                              />
                            </div>
                          </div>
                        )}
                        {currentDepartment.manager?.name && (
                          <div className="d-flex flex-column justify-content-center">
                            <span className="name">
                              {currentDepartment.manager?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </Container>
        )}
      </CustomDrawer>
    </>
  )
}

export default DesktopTable
