import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  InputAdornment,
  Switch,
  TextField,
} from '@material-ui/core'
import { Autocomplete, PaginationItem } from '@material-ui/lab'
import Pagination from '@material-ui/lab/Pagination'
import { BeatLoader } from 'react-spinners'

import { useTranslate } from 'src/locale'

import { ReactComponent as UserInvite } from '../../assets/svgs/departments/user_invite_icon.svg'
import { ReactComponent as Manager } from '../../assets/svgs/departments/user_teammanager_icon.svg'
import CollapseButton from '../CollapseButton'

type Props = {
  state: any
  props: any
  data?: any
}

const MobileTable: React.FC<Props> = ({ state, props, data }) => {
  const translate = useTranslate()
  const { isLoadingMutateDepartment, page, pages } = state
  const {
    icons,
    classes,
    getPageLink,
    toggleInviteNewUserDrawer,
    handleSelectManager,
    handleStatusDepartment,
  } = props
  const { departmentData, employeeData } = data
  const iconStyleFill = {
    fill: '#1976D2',
  }

  return (
    <div className="table-mobile">
      {departmentData.map((division, index) => {
        const iconName = division?.department
          ? division?.department?.replace(/\s+/g, '')
          : ''

        return (
          <CollapseButton
            className="mt-3"
            isLoadingMutateDepartment={isLoadingMutateDepartment}
            icon={icons && icons[iconName]}
            division={division}
            key={index}
          >
            {isLoadingMutateDepartment ? (
              <div className="d-flex align-items-center justify-content-center">
                <BeatLoader color={'var(--primary)'} loading={true} />
              </div>
            ) : (
              <>
                <span className="float-right">
                  <Switch
                    name="is_active"
                    checked={division.is_active}
                    onChange={(e) => handleStatusDepartment(e, division.id)}
                    className="switch-small toggle-switch-success"
                  />
                </span>
                <div className="d-flex flex-column justify-content-center font-size-sm pb-2">
                  <span className="status">{translate('status_live')}</span>
                  <span
                    className={
                      division.is_active ? 'text-success' : 'text-danger'
                    }
                  >
                    {division.is_active
                      ? translate('active_caps')
                      : translate('inactive')}
                  </span>
                </div>
              </>
            )}

            <div>
              <span className="font-size-sm">{translate('manager')}</span>
              <div className="mt-2">
                <Autocomplete
                  id="combo-box-demo"
                  classes={classes}
                  options={employeeData}
                  onChange={(e, value) => {
                    handleSelectManager(e, value, division.id)
                  }}
                  noOptionsText={
                    <Box>
                      No Manager Found
                      <Button
                        onMouseDown={() =>
                          toggleInviteNewUserDrawer(division.department)
                        }
                        size="small"
                        fullWidth
                        className="btn-primary"
                      >
                        <span className="mr-2">
                          <FontAwesomeIcon icon={['fas', 'plus']} />
                        </span>
                        {translate('invite_new_user')}
                      </Button>
                    </Box>
                  }
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
                            onMouseDown={() =>
                              toggleInviteNewUserDrawer(division.department)
                            }
                            size="small"
                            className="py-2"
                            fullWidth
                          >
                            <span className="mr-2">
                              <UserInvite style={iconStyleFill} />
                            </span>
                            <span className="text-primary text-nowrap">
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
                        size="small"
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="py-3">
              <span className="font-size-sm">{translate('description')}</span>
              <p className="font-size-sm description justify-content-sm-center">
                {division.description}
              </p>
            </div>
          </CollapseButton>
        )
      })}
      <div className="pagination py-3 d-flex justify-content-center rounded-0">
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
      </div>
    </div>
  )
}

export default MobileTable
