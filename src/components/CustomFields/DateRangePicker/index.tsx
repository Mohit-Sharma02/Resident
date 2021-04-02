import React, { useCallback, useEffect, useMemo } from 'react'

import { TextField } from '@material-ui/core'
import {
  LocalizationProvider,
  DateRangePicker as MuiDatepicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'
import { DateRange } from '@material-ui/pickers/DateRangePicker/RangeTypes'
import { useFormContext } from 'react-hook-form'

type DateRangePickerProps = {
  name: string
  disabled?: boolean
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  name,
  disabled = false,
}) => {
  const { register, watch, setValue } = useFormContext()

  const value = watch(name, { from: null, to: null })
  const parsedValue: DateRange<Date> = useMemo(() => [value.from, value.to], [
    value,
  ])

  useEffect(() => {
    register(name)
  }, [register, name])

  const handleChange = useCallback(
    (newValue: DateRange<Date>) => {
      setValue(name, { from: newValue[0], to: newValue[1] })
    },
    [setValue, name],
  )

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <MuiDatepicker
        disabled={disabled}
        startText=""
        endText=""
        value={parsedValue}
        onChange={handleChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField className="mr-4" {...startProps} helperText="" />
            <TextField {...endProps} helperText="" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateRangePicker
