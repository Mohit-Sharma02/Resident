import React from 'react'

export default function Status(props) {
  let statusClass = 'bg-red text-white'

  if (props.data === 'Great Initiative') {
    statusClass = 'bg-blue-light text-primary'
  } else if (props.data === 'High') {
    statusClass = 'bg-red-light text-danger'
  }

  return (
    <td className="text-center text-uppercase">
      <div className={`rounded-sm px-2 ${statusClass}`}>{props.data}</div>
    </td>
  )
}
