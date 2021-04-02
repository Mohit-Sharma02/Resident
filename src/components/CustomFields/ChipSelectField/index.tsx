import React, { useCallback, useEffect, useMemo } from 'react'

import { Chip, MenuItem, Select } from '@material-ui/core'
import { isEqual } from 'lodash'
import { useFormContext } from 'react-hook-form'

type ChipSelectFieldProps = {
  name: string
  disabled?: boolean
  options: Array<{
    value: unknown
    label: string
  }>
}
const ChipSelectField: React.FC<ChipSelectFieldProps> = ({
  name,
  disabled = false,
  options,
}) => {
  const { register, watch, setValue } = useFormContext()

  const value = watch(name)
  const parsedValue = useMemo(
    () => options.findIndex((it) => isEqual(it.value, value)),
    [value, options],
  )

  useEffect(() => {
    register(name)
  }, [register, name])

  const handleChange = useCallback(
    (e) => {
      setValue(name, options[e.target.value].value)
    },
    [setValue, name, options],
  )

  return (
    <Select
      name={name}
      disabled={disabled}
      variant="outlined"
      value={parsedValue}
      onChange={handleChange}
      renderValue={() => (
        <Chip label={options[parsedValue] ? options[parsedValue].label : ''} />
      )}
      fullWidth
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={index}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default ChipSelectField
