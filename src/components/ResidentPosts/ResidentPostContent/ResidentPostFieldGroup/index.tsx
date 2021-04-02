import React from 'react'

import { Grid } from '@material-ui/core'

import { useTranslate } from 'src/locale'

import styles from './styles.module.scss'

type ResidentPostFieldGroup = {
  label: string
}

const ResidentPostFieldGroup: React.FC<ResidentPostFieldGroup> = ({
  children,
  label,
}) => {
  const translate = useTranslate()

  return (
    <div className={styles.container}>
      <Grid container spacing={3} alignItems="center">
        <Grid className="table-contain-head" item xs={4}>
          {translate(label)}
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

export default ResidentPostFieldGroup
