/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'

import { Popover } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import './styles.scss'

type Props = {
  open: boolean
  handlePopoverClose: any
  anchorEl: any
  children?: ReactNode
  handlePopoverOpen: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
  }),
)

const CustomPopOver: React.FC<Props> = ({
  anchorEl,
  handlePopoverClose,
  handlePopoverOpen,
  open = false,
  children,
}) => {
  const classes = useStyles()

  return (
    <Popover
      id="mouse-over-popover"
      className={`${classes.popover} popover-desc`}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      PaperProps={{
        onMouseEnter: handlePopoverOpen,
        onMouseLeave: handlePopoverClose,
      }}
    >
      {children}
    </Popover>
  )
}

export default CustomPopOver
