import React from 'react'

type props = {
  className: string
  text: string
}

const DashboardSectionHeader: React.FC<props> = ({ className, text }) => (
  <div className={className}>{text}</div>
)

export default DashboardSectionHeader
