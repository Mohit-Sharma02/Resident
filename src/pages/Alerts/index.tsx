import React from 'react'

import DataTable from 'src/components/DataTable'
import { AlertsData } from 'src/constants/alertsData'

const AlertsPage: React.FC = () => {
  return (
    <>
      <DataTable tableData={AlertsData} />
    </>
  )
}
export default AlertsPage
