import React from 'react'

const TableHeaderCell: React.FC = ({ children }) => {
  return (
    <th className="bg-white text-left border-top-0 font-weight-500 text-secondary-text">
      {children}
    </th>
  )
}

export default TableHeaderCell
