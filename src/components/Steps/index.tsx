import React, { ReactNode, useCallback, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse } from '@material-ui/core'

import './styles.scss'

type StepsProps = {
  step?: number
  title?: string
  description?: string
  children?: ReactNode
  descriptionClass?: string
  external?: boolean
  opened?: boolean
}

const Steps: React.FC<StepsProps> = ({
  step,
  title,
  description,
  children,
  descriptionClass,
  external = false,
  opened = true,
}) => {
  const [accordion, setAccordion] = useState<boolean[]>([opened])

  const toggleAccordion = useCallback((tab) => {
    setAccordion((oldAccordion) =>
      oldAccordion.map((x, index) => (tab === index ? !x : false)),
    )
  }, [])

  return (
    <>
      <div className="bg-step bg-white d-flex flex-column mt-5 mb-3">
        <div
          className={`step-header d-flex flex-rows align-items-center ${
            children ? 'cursor-pointer' : ''
          }`}
          onClick={() => toggleAccordion(0)}
        >
          {step && (
            <div className="step-number flex-none ml-3 text-white font-weight-bold d-flex align-items-center justify-content-center">
              {step}
            </div>
          )}
          {title && (
            <div className="flex-none font-weight-bold mx-3 font-size-lg d-flex align-items-center">
              {title}
            </div>
          )}
          <div
            className={`flex-1 d-flex align-items-center ${
              descriptionClass || ''
            }`}
          >
            {description && (
              <span className="font-size-sm step-desc">{description}</span>
            )}
          </div>
          {children && (
            <div className="mx-3">
              <FontAwesomeIcon
                icon={['fas', 'angle-down']}
                className="font-size-xl accordion-icon text-primary"
              />
            </div>
          )}
        </div>
        {children && !external && (
          <Collapse className="accordion-content" in={accordion[0]}>
            {children && <div>{children}</div>}
          </Collapse>
        )}
      </div>
      <div>
        {children && external && (
          <Collapse className="accordion-content" in={accordion[0]}>
            {children && <div>{children}</div>}
          </Collapse>
        )}
      </div>
    </>
  )
}

export default Steps
