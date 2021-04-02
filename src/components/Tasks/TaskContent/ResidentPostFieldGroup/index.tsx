import React from 'react'

import { Grid } from '@material-ui/core'

type ResidentPostFieldGroup = {
  label: string
}

const ResidentPostFieldGroup: React.FC<ResidentPostFieldGroup> = ({
  children,
  label,
}) => {
  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className="border-bottom py-2"
    >
      <Grid item xs={4}>
        {label}
      </Grid>
      <Grid item xs={8}>
        {children}
      </Grid>
    </Grid>
  )
}

export default ResidentPostFieldGroup
