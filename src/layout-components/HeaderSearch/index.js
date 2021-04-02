import React from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from '@material-ui/core'
import clsx from 'clsx'

import { setHeaderSearchHover } from 'src/store/theme-options/actions'

const HeaderSearch = (props) => {
  const { headerSearchHover, setHeaderSearchHover } = props

  const toggleHeaderSearchHover = () => {
    setHeaderSearchHover(!headerSearchHover)
  }

  return (
    <>
      <div className="header-search-wrapper">
        <div
          className={clsx('search-wrapper', {
            'is-active': headerSearchHover,
          })}
        >
          <label className="icon-wrapper" htmlFor="header-search-input">
            <FontAwesomeIcon icon={['fas', 'search']} />
          </label>
          <TextField
            onFocus={toggleHeaderSearchHover}
            onBlur={toggleHeaderSearchHover}
            id="header-search-input"
            name="header-search-input"
            type="search"
            placeholder="Search terms..."
            variant="outlined"
          />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  headerSearchHover: state.ThemeOptions.headerSearchHover,
})

const mapDispatchToProps = (dispatch) => ({
  setHeaderSearchHover: (enable) => dispatch(setHeaderSearchHover(enable)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)
