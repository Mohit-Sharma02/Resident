import React, { useCallback, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  Grid,
} from '@material-ui/core'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import ReactTooltip from 'react-tooltip'
import uuid from 'react-uuid'

import { useTranslate } from 'src/locale'

import { ReactComponent as Accelerate } from '../../assets/icons/accelerate.svg'
import { ReactComponent as Alert } from '../../assets/icons/alert2.svg'
import { ReactComponent as Appreciations } from '../../assets/icons/appreciations.svg'
import { ReactComponent as Assets } from '../../assets/icons/assets.svg'
import { ReactComponent as Cityview } from '../../assets/icons/cityview.svg'
import { ReactComponent as Connectors } from '../../assets/icons/connectors.svg'
import { ReactComponent as Delight } from '../../assets/icons/delight.svg'
import { ReactComponent as Departments } from '../../assets/icons/departments.svg'
import { ReactComponent as Engage } from '../../assets/icons/engage.svg'
import { ReactComponent as Events } from '../../assets/icons/events.svg'
import { ReactComponent as Gps } from '../../assets/icons/gps.svg'
import { ReactComponent as Infrastructure } from '../../assets/icons/infrastructure.svg'
import { ReactComponent as Initiate } from '../../assets/icons/initiate.svg'
import { ReactComponent as Inspections } from '../../assets/icons/inspections.svg'
import { ReactComponent as Marketplace } from '../../assets/icons/marketplace.svg'
import { ReactComponent as Playbooks } from '../../assets/icons/playbooks.svg'
import { ReactComponent as Propel } from '../../assets/icons/propel.svg'
import { ReactComponent as Proposals } from '../../assets/icons/proposals2.svg'
import { ReactComponent as Requests } from '../../assets/icons/requests.svg'
import { ReactComponent as Residents } from '../../assets/icons/residents.svg'
import { ReactComponent as Routes } from '../../assets/icons/routes.svg'
import { ReactComponent as Suggestions } from '../../assets/icons/suggestions.svg'
import { ReactComponent as Tasks } from '../../assets/icons/tasks.svg'
import { ReactComponent as Vehicles } from '../../assets/icons/vehicles.svg'
import { ReactComponent as Worklogs } from '../../assets/icons/worklogs.svg'

import '../../assets/custom/priceItem.scss'

const icons: { [key: string]: JSX.Element } = {
  Residents: <Residents />,
  Requests: <Requests />,
  Suggestions: <Suggestions />,
  Appreciations: <Appreciations />,
  Cityview: <Cityview />,
  Proposals: <Proposals />,
  Alert: <Alert />,
  Events: <Events />,
  Departments: <Departments />,
  Vehicles: <Vehicles />,
  Assets: <Assets />,
  Marketplace: <Marketplace />,
  Worklogs: <Worklogs />,
  Infrastructure: <Infrastructure />,
  Gps: <Gps />,
  Routes: <Routes />,
  Tasks: <Tasks />,
  Inspections: <Inspections />,
  Playbooks: <Playbooks />,
  Connectors: <Connectors />,
  Initiate: <Initiate />,
  Engage: <Engage />,
  Accelerate: <Accelerate />,
  Propel: <Propel />,
  Delight: <Delight />,
}

const noPriceData = [
  {
    title: 'residents_live',
    icon: 'Residents',
    text: 'nocharge_unlimited',
  },
  {
    title: 'requests_title_text',
    icon: 'Requests',
    text: 'nocharge_request',
  },
  {
    title: 'suggestions_title_text',
    icon: 'Suggestions',
    text: 'nocharge_suggestion',
  },
  {
    title: 'appreciation_title_text',
    icon: 'Appreciations',
    text: 'nocharge_appreceation',
  },
  {
    title: 'city_view',
    icon: 'Cityview',
    text: 'nocharge_unlimited',
  },
  {
    title: 'proposals_title_text',
    icon: 'Proposals',
    text: 'nocharge_proposals',
  },
  {
    title: 'alerts',
    icon: 'Alert',
    text: 'nocharge_alerts',
  },
  {
    title: 'events_title_text',
    icon: 'Events',
    text: 'nocharge_events',
  },
  {
    title: 'worklogs',
    icon: 'Worklogs',
    text: 'nocharge_worklog',
  },
  {
    title: 'infrastructure_title_text',
    icon: 'Infrastructure',
    text: 'nocharge_infrastructure',
  },
  {
    title: 'assets',
    icon: 'Assets',
    text: 'nocharge_assets',
  },
  {
    title: 'inspections_title_text',
    icon: 'Inspections',
    text: 'nocharge_inspections',
  },
  {
    title: 'events_title_text',
    icon: 'Tasks',
    text: 'nocharge_tasks',
  },
  {
    title: 'vehicles_title_text',
    icon: 'Vehicles',
    text: 'nocharge_vehicles',
  },
  {
    title: 'gps_tracking_live',
    icon: 'Gps',
    text: 'nocharge_unlimited',
  },
  {
    title: 'routes',
    icon: 'Routes',
    text: 'nocharge_routes',
  },
]

type PriceItemProps = {
  selected?: boolean
  icon: string
  title: string
  description: string
  price: string
  month?: string
  hideButton: boolean
  list: Array<{
    id: number | string
    icon?: string
    title: string
    prices: Array<{
      titleLeft: string
      titleRight: string
    }>
    priceTitle: string
  }>
  buttonTitle: string
  allAndMore: any
  current: boolean
}

const PriceItem: React.FC<PriceItemProps> = ({
  selected,
  icon,
  title,
  description,
  price,
  month,
  hideButton,
  allAndMore,
  list,
  buttonTitle,
  current,
}) => {
  const translate = useTranslate()

  const classCard = selected
    ? 'mb-5 card-box shadow-xxl border-3 card-content box-card-border'
    : 'mb-5 card-box-hover-rise card-box-hover card-content'
  const classCardContent = selected
    ? 'px-4 pb-4 pt-3 text-center'
    : 'px-4 pb-4 pt-3 text-center'
  const classCardContentH3 = selected
    ? 'display-3 my-3 title-selected'
    : 'display-4 my-3 title'
  const classButton = selected
    ? 'btn btn-warning btn-sm rounded-pill'
    : 'btn btn-outline-warning btn-sm rounded-pill'
  const currentButton = selected
    ? 'btn btn-primary btn-sm rounded-pill'
    : 'btn btn-outline-warning btn-sm rounded-pill'
  const classPrice = selected
    ? 'price-selected price'
    : 'display-2 font-weight-bold price'

  const [accordion, setAccordion] = useState<boolean[]>(list.map(() => false))
  const [modal, seModal] = useState(false)
  const toggle = () => seModal(!modal)

  const toggleAccordion = useCallback((tab) => {
    setAccordion((oldAccordion) =>
      oldAccordion.map((x, index) => (tab === index ? !x : false)),
    )
  }, [])

  const toolTip = (data: {
    prices: Array<{ titleLeft: string; titleRight: string }>
    priceTitle: string
  }) => {
    const list = data.prices
    const items = list
      .map(
        ({ titleLeft, titleRight }) => `
      <div>
      <span>${translate(titleLeft)}</span>
      <span>${titleRight}</span>
      </div>
    `,
      )
      .join()
      .replace(/,/g, '')

    return `<div class="tooltip">
        <span class="title">${
          data.priceTitle && translate(data.priceTitle)
        }</span>
        <div class="table">
          <div class="head">
            <span>${translate('price_label_quantity')}</span>
            <span>${translate('per_month')}</span>
          </div>
          ${items}
        </div>
      </div>`
  }

  return (
    <Grid className="price-item" item md={12} lg>
      <Card className={classCard}>
        <CardContent className={classCardContent}>
          <div className="price-logo">{icons[icon]}</div>
          <div className="top-info">
            <h3 className={classCardContentH3}>{translate(title)}</h3>
            <p className="mb-0 text">{translate(description)}</p>
            <span className={classPrice}>
              {price}
              {month && <span>{month}</span>}
            </span>
          </div>
          <ul className="price-options-content">
            {allAndMore && (
              <li className="all-and-more">
                {allAndMore && translate(allAndMore)}
              </li>
            )}
            {list.map((item, index) => (
              <li
                key={`${title}price-item${item.id}`}
                className={clsx('card-box', {
                  'panel-open': accordion[index],
                })}
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <ReactTooltip
                    id={`${title}tip${item.id}`}
                    html={true}
                    clickable={true}
                    disable={isMobile || !item.icon}
                  />
                  <div
                    className="price-options-item"
                    data-background-color="none"
                    data-tip={toolTip({
                      prices: item.prices,
                      priceTitle: item.priceTitle && translate(item.priceTitle),
                    })}
                    data-class="tip"
                    data-for={`${title}tip${item.id}`}
                  >
                    {item.icon && <i className="icon">{icons[item.icon]}</i>}
                    <span className="item-accordion-text">
                      {translate(item.title)}
                    </span>
                    {isMobile && item.icon && (
                      <FontAwesomeIcon
                        icon={['fas', 'angle-down']}
                        className="font-size-xl accordion-icon"
                      />
                    )}
                  </div>
                  {isMobile && item.icon && (
                    <Collapse
                      className="accordion-content"
                      in={accordion[index]}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: toolTip({
                            prices: item.prices,
                            priceTitle: translate(item.priceTitle),
                          }),
                        }}
                      />
                    </Collapse>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {hideButton === false && (
        <Button
          href="#/"
          onClick={(e) => e.preventDefault()}
          fullWidth
          variant="text"
          className={current ? currentButton : classButton}
        >
          {buttonTitle}
        </Button>
      )}
      <Dialog
        scroll="body"
        maxWidth="md"
        open={modal}
        onClose={toggle}
        classes={{
          paper: 'modal-content border-0 bg-white rounded-lg p-3 p-xl-0',
        }}
      >
        <div className="p-5">
          <h4 className="text-primary font-weight-bold">
            {translate('nocharge_description2')}
          </h4>
          <div className="text-primary font-size-lg font-weight-bold">
            {translate('nocharge_description3')}
          </div>
          <div>{translate('nocharge_description1')}</div>
          <ul className="list-unstyled pt-3">
            {noPriceData.map((item) => (
              <li className="py-1" key={uuid()}>
                {item.icon && <i className="icon">{icons[item.icon]}</i>}
                <span className="pl-2 font-weight-bold">
                  {translate(item.title)}
                </span>
                <span className="pl-2">{translate(item.text)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Dialog>
    </Grid>
  )
}

export default PriceItem
