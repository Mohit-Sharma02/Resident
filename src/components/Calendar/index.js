import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Tooltip,
} from '@material-ui/core'
import clsx from 'clsx'
import PerfectScrollbar from 'react-perfect-scrollbar'

const CalendarComponent = () => {
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false)

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen)

  return (
    <>
      <div className="app-inner-content-layout app-inner-content-layout-fixed">
        <div className="d-flex d-lg-none p-4 order-0 justify-content-between align-items-center">
          <Button
            onClick={toggleSidebarMenu}
            size="small"
            className="btn-primary p-0 btn-icon d-40"
          >
            <FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
          </Button>
        </div>
        <div
          className={clsx(
            'app-inner-content-layout--sidebar app-inner-content-layout--sidebar__lg bg-secondary border-right',
            { 'layout-sidebar-open': isSidebarMenuOpen },
          )}
        >
          <PerfectScrollbar>
            <div className="px-4">
              <List
                component="div"
                className="nav-pills nav-neutral-primary flex-column"
              >
                <ListItem className="nav-header px-0 d-flex pb-2 align-items-center">
                  <div className="text-primary font-weight-bold">
                    Calendar Events
                  </div>
                  <div className="ml-auto font-size-xs">
                    <a href="#/" onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                    </a>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="badge badge-success badge-circle-inner shadow-none mr-2">
                    1
                  </div>
                  Upcoming events
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="badge badge-warning badge-circle-inner shadow-none mr-2">
                    2
                  </div>
                  Planned holidays
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="badge badge-first badge-circle-inner shadow-none mr-2">
                    3
                  </div>
                  Meetups near you
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="badge badge-danger badge-circle-inner shadow-none mr-2">
                    4
                  </div>
                  Other events
                </ListItem>
              </List>
            </div>
            <div className="divider mt-2" />
            <div className="p-4 bg-white">
              <List
                component="div"
                className="p-0 nav-pills nav-neutral-primary flex-column"
              >
                <ListItem className="nav-header m-0 pt-0 px-0 d-flex pb-3 align-items-center">
                  <div className="text-primary font-weight-bold">
                    Statistics
                  </div>
                  <div className="ml-auto font-size-xs">
                    <Tooltip title="Refresh stats" placement="left">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="text-success"
                      >
                        <FontAwesomeIcon icon={['fas', 'cog']} />
                      </a>
                    </Tooltip>
                  </div>
                </ListItem>
              </List>
              <Grid container spacing={6} className="font-size-xs">
                <Grid item lg={6}>
                  <Card className="shadow-none bg-light text-center p-3">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">345</b>
                      <span className="text-black-50 d-block">friends</span>
                    </div>
                  </Card>
                </Grid>
                <Grid item lg={6}>
                  <Card className="shadow-none bg-light text-center p-3">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-danger"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">2,693</b>
                      <span className="text-black-50 d-block">messages</span>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <div className="p-4">
              <List
                component="div"
                className="nav-pills nav-neutral-primary flex-column"
              >
                <ListItem className="nav-header p-0 m-0">
                  <div className="text-primary font-weight-bold">
                    Upcoming meetups
                  </div>
                </ListItem>
              </List>
              <Card className="card-box mt-3 mb-4">
                <div className="card-indicator bg-first" />
                <CardContent className="px-4 py-3">
                  <div className="pb-3 d-flex justify-content-between">
                    <a href="#/" onClick={(e) => e.preventDefault()}>
                      Presentation site design
                    </a>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="badge badge-first px-3">On hold</div>
                    <div className="font-size-sm text-danger px-2">
                      <FontAwesomeIcon
                        icon={['far', 'clock']}
                        className="mr-1"
                      />
                      14:22
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-box mb-4">
                <div className="card-indicator bg-success" />
                <CardContent className="px-4 py-3">
                  <div className="pb-3 d-flex justify-content-between">
                    <a href="#/" onClick={(e) => e.preventDefault()}>
                      Create UI mockups
                    </a>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="badge badge-success px-3">Fixed</div>
                    <div className="font-size-sm text-dark px-2">
                      <FontAwesomeIcon
                        icon={['far', 'clock']}
                        className="mr-1"
                      />
                      09:41
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-pill btn-primary"
                fullWidth
                size="small"
              >
                Add more events
              </Button>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="app-inner-content-layout--main card-box bg-white p-0">
          <div className="card-header rounded-0 bg-white p-4 border-bottom">
            <div className="card-header--title">
              <small>Events</small>
              <b className="font-size-lg">Events calendar</b>
            </div>
            <div className="card-header--actions">
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                size="small"
                className="btn-first btn-icon d-40 p-0 hover-scale-sm btn-pill"
              >
                <FontAwesomeIcon icon={['fas', 'plus']} />
              </Button>
            </div>
          </div>
          <PerfectScrollbar>
            <div className="p-4">{/* <CalendarFullWidth /> */}</div>
          </PerfectScrollbar>
        </div>

        <div
          onClick={toggleSidebarMenu}
          className={clsx('sidebar-inner-layout-overlay', {
            active: isSidebarMenuOpen,
          })}
        />
      </div>
    </>
  )
}

export default CalendarComponent
