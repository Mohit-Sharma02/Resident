import React, { Fragment, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Divider, withStyles } from '@material-ui/core'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import PerfectScrollbar from 'react-perfect-scrollbar'
import uuid from 'react-uuid'

import { MapFilter, useFilters } from 'src/contexts/filters'
import { useTranslate } from 'src/locale'
import { sidebarMapViewRoutes } from 'src/SideBarMenuMapViewRoutes'
import { setSidebarToggleMobile } from 'src/store/theme-options/actions'
import isIpad from 'src/utils/isIpad'
import isMobile from 'src/utils/isMobile'

const SideBarMenuMapView = (props) => {
  const isMobileOrIpad = isMobile() || isIpad()
  const { sidebarToggle } = props
  const checkarry: any = []
  const selectedType: string[] = ['request', 'suggestion', 'appreciation']
  sidebarMapViewRoutes.map((route) =>
    route.menu.map((r) => {
      return checkarry.push({ [r.name]: r.checked })
    }),
  )
  const translate = useTranslate()
  const { filters, setFilters } = useFilters()

  const handleClick = useCallback(
    (name: string, checked?: any) => {
      setFilters((oldFilters: MapFilter[]) => {
        const currentFilters: MapFilter[] = Array.from(oldFilters)
        if (checked === true || checked === false) {
          const filter = currentFilters.find((item) => item.name === name)
          if (filter) {
            filter.checked = checked
          }
        } else if (name && name !== 'residents' && checked === null) {
          currentFilters.forEach((item) => {
            item.value = false
          })
          const filter = currentFilters.find((item) => item.name === name)
          if (filter) {
            filter.value = true
          }
        }

        return currentFilters
      })
    },
    [setFilters],
  )
  const [accordion, setAccordion] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ])

  const toggleAccordion = (tab) => {
    const prevState = accordion
    const state = prevState.map((x, index) => (tab === index ? !x : x))
    setAccordion(state)
  }

  const [checked, setChecked] = useState(checkarry)

  const WhiteCheckbox = withStyles({
    root: {
      color: '#64B5F6',
      '&$checked': {
        color: '#fff',
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />)

  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentFilter: string,
  ) => {
    handleClick(currentFilter, event.target.checked)
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <ul>
            <li>
              {sidebarMapViewRoutes.map((route, index) => {
                return (
                  <Fragment key={uuid()}>
                    <Divider />
                    {route.isHideMobile && isMobileOrIpad
                      ? null
                      : route.name && (
                          <div
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={accordion[index]}
                            className="sidebar-header d-flex flex-row"
                          >
                            <span className="sidebar-icon mr-2">
                              {route.nameIcon}
                            </span>
                            {!sidebarToggle && (
                              <>
                                <span className="sidebar-item-label sidebar-title-menu sidebar-font text-white mr-auto">
                                  {translate(route.name).toUpperCase()}
                                </span>
                                <FontAwesomeIcon
                                  icon={
                                    accordion[index]
                                      ? ['fas', 'angle-up']
                                      : ['fas', 'angle-down']
                                  }
                                  className="font-size-xl accordion-icon"
                                />
                              </>
                            )}
                          </div>
                        )}

                    {route.menu &&
                      route.menu.map((r, idx) => {
                        if (r.isHideMobile && isMobileOrIpad) {
                          return null
                        } else {
                          return (
                            <Fragment key={uuid()}>
                              <Collapse in={accordion[index]}>
                                <NavLink
                                  activeClassName={
                                    (
                                      checked[r.type] !== undefined
                                        ? checked[r.type]
                                        : r.checked
                                    )
                                      ? 'active'
                                      : 'inactive'
                                  }
                                  className="nav-link-simple"
                                  to="#"
                                >
                                  <div
                                    className="d-flex flex-row"
                                    onClick={(e) => {
                                      handleClick(
                                        `${r.type
                                          .toLowerCase()
                                          .replace(/\s/g, '')}`,
                                        null,
                                      )
                                    }}
                                  >
                                    <span className="sidebar-icon">
                                      {r.iconLightBlue}
                                    </span>
                                    {!sidebarToggle && (
                                      <Fragment>
                                        <span className="sidebar-item-label sidebar-font text-primary-light">
                                          {translate(r.name)}
                                        </span>
                                      </Fragment>
                                    )}
                                  </div>
                                  {!sidebarToggle && (
                                    <Fragment>
                                      <span className="sidebar-icon-indicator">
                                        <WhiteCheckbox
                                          name={r.type}
                                          onChange={(e) =>
                                            handleChangeCheckbox(
                                              e,
                                              `${r.type
                                                .toLowerCase()
                                                .replace(/\s/g, '')}`,
                                            )
                                          }
                                          checked={
                                            checked[r.type] !== undefined
                                              ? checked[r.type]
                                              : r.checked
                                          }
                                        />
                                      </span>
                                    </Fragment>
                                  )}
                                </NavLink>
                              </Collapse>
                            </Fragment>
                          )
                        }
                      })}
                  </Fragment>
                )
              })}
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
})

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenuMapView)
