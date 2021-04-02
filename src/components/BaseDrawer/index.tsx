import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import {
  Button,
  CircularProgress,
  Drawer,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import clsx from 'clsx'

import { useTranslate } from 'src/locale'
type BaseDrawerProps = {
  title?: string
  children?: React.ReactNode
  onClose?: () => void
  isLoading?: boolean
  error?: string
  actions?: React.ReactNode
}

export type BaseDrawerActions = {
  toggle: () => void
  open: () => void
  close: () => void
}

const BaseDrawer: React.ForwardRefRenderFunction<
  BaseDrawerActions,
  BaseDrawerProps
> = ({ children, title, onClose, isLoading, error, actions }, ref) => {
  const [open, setOpen] = useState<boolean>(false)
  const translate = useTranslate()
  const handleClose = useCallback(() => {
    setOpen(false)
    onClose && onClose()
  }, [onClose])

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setOpen((oldState) => !oldState)
    },
    open: () => {
      setOpen(true)
    },
    close: () => {
      setOpen(false)
    },
  }))

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="persistent"
      style={{ width: '100%' }}
      keepMounted
    >
      <div className="sidebar-top" style={{ width: 600, maxWidth: '100vw' }}>
        <div className="d-flex align-items-center py-4 pr-4 ">
          <Tooltip arrow title="Close" placement="left">
            <Button
              size="small"
              onClick={handleClose}
              className="close-drawer-btn bg-white p-0 d-40"
              id="CloseDrawerTooltip"
            >
              <div
                className={clsx('navbar-toggler hamburger hamburger--elastic', {
                  'is-active': true,
                })}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </div>
            </Button>
          </Tooltip>
          {title && (
            <Typography variant="h4" className="mb-0 drawer_title mt-2">
              {translate(title)}
            </Typography>
          )}
          {actions && <div className="ml-auto">{actions}</div>}
        </div>
        <div className="mt-2 drawer-content">
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            children
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default forwardRef(BaseDrawer)
