/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Fab, SwipeableDrawer } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import './styles.scss'
import { useTranslate } from 'src/locale'

type Props = {
  title?: string
  navTitle?: string
  description?: string
  open?: boolean
  titleIcon?: ReactNode
  toggleDrawer?: any
  children?: ReactNode
  openPosition?: 'left' | 'right' | 'top'
  onClose?: any
  onOpen?: any
  onInsert?: any
}
const CustomDrawer: React.FC<Props> = ({
  title,
  titleIcon,
  description,
  open = false,
  toggleDrawer,
  children,
  onClose,
  onOpen,
  navTitle,
  onInsert,
  openPosition = 'right',
}) => {
  const translate = useTranslate()

  return (
    <SwipeableDrawer
      anchor={openPosition}
      open={open}
      onClose={() => {
        if (onClose) {
          onClose()
        }
        if (toggleDrawer) {
          toggleDrawer()
        }
      }}
      onOpen={() => onOpen()}
      keepMounted
      className="drawer_width"
    >
      <div className="d-flex">
        <Fab
          className="my-3 mx-3 icon-height"
          color="default"
          size="small"
          aria-label="close"
          onClick={() => {
            if (onClose) {
              onClose()
            }
            if (toggleDrawer) {
              toggleDrawer()
            }
          }}
        >
          <CloseIcon style={{ fill: '#1976D2' }} />
        </Fab>
        {navTitle && (
          <div className="flex-grow-1 text-center nav-title">
            {translate(`${navTitle}`)}
          </div>
        )}
        {onInsert && (
          <Button
            variant="contained"
            size="small"
            className="d-40 btn-success my-3 mx-3"
            onClick={() => onInsert()}
          >
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
            </span>
          </Button>
        )}
      </div>
      {!title && !description && (
        <div className="customdrawer d-flex flex-column">{children}</div>
      )}
      {(title || description) && (
        <div className="customdrawer">
          <Container>
            <div className="text-center d-flex flex-column">
              <span className="font-size-md">
                {titleIcon && <span className="mr-2">{titleIcon}</span>}
                {translate(`${title}`)}
              </span>
              <div className="font-size-md py-2">
                <span>{translate(`${description}`)}</span>
              </div>
            </div>
            {children}
          </Container>
        </div>
      )}
    </SwipeableDrawer>
  )
}

export default CustomDrawer
