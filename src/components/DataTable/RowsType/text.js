import React from 'react'

export default function Text(props) {
  return (
    <td>
      <div
        className="font-size-sm text-wrap text-primary-text"
        style={{ minWidth: '250px' }}
      >
        {props.data}
      </div>
    </td>
  )
}
