import React from 'react'

export default function Avatar({ data, subTitle, avatar }) {
  const isObject = (variable) => {
    return typeof variable === 'object' && variable !== null
  }

  const name = isObject(data) ? data.name : data
  const src = isObject(data) ? data.avatar : avatar

  return (
    <td>
      <div className="d-flex align-items-center">
        <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
          <div className="avatar-icon">
            <img alt="..." src={src} />
          </div>
        </div>
        <div className="text-primary-text">
          {name && name}
          {subTitle && (
            <>
              <br />
              <span className="color-grey text-uppercase font-size-xs text-secondary-text">
                {subTitle}
              </span>
            </>
          )}
        </div>
      </div>
    </td>
  )
}
