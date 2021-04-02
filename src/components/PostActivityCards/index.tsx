import React, { Fragment, ReactNode } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '@material-ui/core'

import { useTranslate } from 'src/locale'
import getPercentageChange from 'src/utils/getPercentageChange'

type Props = {
  bgColor?: string
  currentCount?: number
  previousCount?: number
  title?: string
  titleIcon?: ReactNode
}

const PostActivityCards: React.FC<Props> = ({
  titleIcon,
  title,
  currentCount,
  bgColor,
  previousCount,
}) => {
  const translate = useTranslate()
  currentCount = currentCount || 0
  const calc = currentCount - (previousCount || 0)
  const isIncreased = Math.sign(calc) === 1
  const percent = getPercentageChange(isIncreased, currentCount, previousCount)

  return (
    <Fragment>
      <div className="mb-spacing-6">
        <Card className="card-box border-0 shadow-first-sm p-4">
          <div className="d-flex align-items-center">
            <div
              className={`d-40 btn-icon rounded ${bgColor} text-white text-center font-size-lg mr-3`}
            >
              {titleIcon}
            </div>
            <div className="text-black">{title}</div>
          </div>
          <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
            <FontAwesomeIcon
              icon={['fas', isIncreased ? 'arrow-up' : 'arrow-down']}
              className={`font-size-sm text-${
                isIncreased ? 'success' : 'danger'
              } mr-2`}
            />
            <div>{currentCount}</div>
          </div>
          <div className="text-black-50 text-center pt-3">
            <b>
              {isIncreased && '+'}
              {percent}%
            </b>{' '}
            {translate('requestspercentchange')}
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export default PostActivityCards
