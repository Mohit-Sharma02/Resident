import React from 'react'

import { LinearProgress } from '@material-ui/core'

type ProgressBarProps = {
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query'
  value?: number
  className?: string
}

const CustomLinearProgressBar: React.FC<ProgressBarProps> = ({
  variant,
  value,
  className,
}) => (
  <div className="d-block">
    <LinearProgress variant={variant} value={value} className={className} />
  </div>
)

export default CustomLinearProgressBar
