import React, { ReactNode } from 'react'

import { Grid, InputAdornment, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

import { useTranslate } from 'src/locale'

type InputProps = {
  name: string
  type?: 'text' | 'email' | 'password' | 'hidden' | 'date'
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  autoFocus?: boolean
  readOnly?: boolean
  icon?: ReactNode
  variant?: string
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  disabled,
  icon,
  autoFocus,
  placeholder,
  className,
  readOnly,
  variant = 'outlined',
}) => {
  const { register, errors } = useFormContext()
  const translate = useTranslate()
  const isError = !!errors[name]
  const helperText = errors[name]?.message

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          variant={variant}
          className={className}
          type={type}
          label={translate(`${label}`) || ''}
          id={name}
          placeholder={translate(`${placeholder}`)}
          name={name}
          inputRef={register}
          error={isError}
          helperText={helperText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          disabled={disabled}
          inputProps={{ readOnly }}
          fullWidth
          autoFocus={autoFocus}
        />
      </Grid>
    </Grid>
  )
}

export default Input
