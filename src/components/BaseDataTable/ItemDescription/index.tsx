import React from 'react'

const ItemDescription: React.FC = ({ children }) => {
  return (
    <div
      className="font-size-sm text-wrap text-primary-text"
      style={{ minWidth: '250px' }}
    >
      {children}
    </div>
  )
}

export default ItemDescription
