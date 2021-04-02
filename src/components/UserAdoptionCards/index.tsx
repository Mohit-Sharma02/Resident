import React, { Fragment, ReactNode } from 'react'

import { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card } from '@material-ui/core'
import { CircularProgressbar } from 'react-circular-progressbar'
import CountUp from 'react-countup'

import between from 'src/utils/valueInBetween'

import constants from '../../constants/index'

import './styles.scss'

const { COLOR } = constants

type UserAdoptionCardProps = {
  title: string
  count?: number
  isPercentage?: boolean
  strokeWidth: number
  inviteCount?: number
  icon?: IconName
  titleIcon?: ReactNode
  isInvite?: boolean
  showInvite?: boolean
  inviteText?: string
  inviteColor?: any
  handleInviteButton?: () => void
  percent?: number
  showButton?: boolean
}

const UserAdoptionCard: React.FC<UserAdoptionCardProps> = ({
  title,
  count = 0,
  isPercentage,
  strokeWidth,
  icon,
  titleIcon,
  isInvite,
  inviteText,
  inviteCount,
  inviteColor,
  showInvite,
  handleInviteButton,
  percent = 0,
  showButton = true,
}) => {
  let color
  if (percent > -1) {
    const countBetweenZeroFifty = between(percent, 0, 50)
    const countBetweenFiftyOneEighty = between(percent, 51, 80)
    const countBetweenEightyOneHundred = between(percent, 81, 100)
    if (countBetweenZeroFifty) {
      color = COLOR.DANGER
      if (icon === undefined) icon = 'chevron-down'
    } else if (countBetweenFiftyOneEighty) {
      color = COLOR.WARNING
      if (icon === undefined) icon = 'chevron-down'
    } else if (countBetweenEightyOneHundred) {
      color = COLOR.SUCCESS
      if (icon === undefined) icon = 'chevron-up'
    }
  }
  count = count || 0
  const displayInvite =
    inviteCount !== undefined && isInvite ? count < inviteCount : showInvite

  return (
    <Fragment>
      <Card
        className={`card-box card-box-border-bottom border-${color} shadow-${color}-sm`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="p-3 custom_w70">
            <div className="text-black pb-2 font-size-sm">
              <span className="mr-1">{titleIcon}</span>
              {title}
            </div>
            <h3 className="font-weight-bold display-4 mb-0 text-black">
              <span className="text-nowrap">
                <CountUp
                  start={0}
                  end={count}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={0}
                  decimal=","
                />
                {displayInvite && showButton && (
                  <Button
                    className={`ml-3 text-white`}
                    style={inviteColor}
                    onClick={handleInviteButton}
                  >
                    {inviteText}
                  </Button>
                )}
              </span>
              {isPercentage && (
                <small className="opacity-6 pl-1 text-black-50">%</small>
              )}
            </h3>
          </div>
          <div className="p-3 custom_w30 text-center">
            <CircularProgressbar
              value={percent}
              text={percent + '%'}
              strokeWidth={strokeWidth}
              className={`m-3 circular-progress-sm circular-progress-${color}`}
            />
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default UserAdoptionCard
