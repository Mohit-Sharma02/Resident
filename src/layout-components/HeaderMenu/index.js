import React, { useState } from 'react'

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'mega-menu-popover' : undefined

  const [anchorElMenu, setAnchorElMenu] = useState(null)

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  return (
    <>
      <div className="app-header-menu" />
    </>
  )
}

export default HeaderMenu
