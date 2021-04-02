import React from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx'

import { useTranslate } from 'src/locale'

const Footer = (props) => {
  const translate = useTranslate()
  const { footerShadow, footerBgTransparent } = props

  return (
    <>
      <div
        className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent,
        })}
      >
        <div className="app-footer--first" />
        <div className="app-footer--second">
          <span>{translate('citycare')}</span> {translate('tagline')}{' '}
          {/* {translate('citycarecopyright_pt1_2021')}{' '} */}
          <span className="text-danger px-1">❤</span> {translate('by_key')}{' '}
          <a
            href="https://baseline.io"
            target="_blank"
            title="baseline.io"
            rel="noopener noreferrer"
          >
            {translate('baseline_link')}
          </a>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent,
})

export default connect(mapStateToProps)(Footer)
