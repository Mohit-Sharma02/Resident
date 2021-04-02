import React from 'react'

const ItemStatus: React.FC = ({ children }) => {
  return (
    <div className="rounded-sm px-2 bg-blue-light text-primary text-uppercase">
      {children}
    </div>
  )
}

export default ItemStatus
