import React from 'react'

import { Typography } from '@material-ui/core'

import { ReactComponent as Residents } from 'src/assets/svgs/settingSidebar/residents.svg'
import CheckboxField from 'src/components/FilterDrawer/fields/CheckboxField'
import DateRangeField from 'src/components/FilterDrawer/fields/DateRangeField'
import MultipleCheckboxField from 'src/components/FilterDrawer/fields/MultipleCheckboxField'
// import SliderField from 'src/components/FilterDrawer/fields/SliderField'
import TextField from 'src/components/FilterDrawer/fields/TextField'
import HiddenContent from 'src/components/FilterDrawer/HiddenContent'
import { useTranslate } from 'src/locale'

const ResidentsFiltersDrawerContent: React.FC = () => {
  const translate = useTranslate()
  const preferencesOptions = [
    { name: 'showUsername', label: 'showUsername' },
    { name: 'homeAddressHidden', label: 'homeAddressHidden' },
  ]

  return (
    <>
      <div className="styles_container__Fv2l_">
        <Typography
          variant="h6"
          className="text-left drawer_heading font-weight-600"
          gutterBottom
        >
          <Residents fill="currentColor" />
          {translate('Residents')}
        </Typography>
      </div>
      <TextField name="location" label="location_live" />
      {/* <SliderField name="age" label="age_live" /> */}
      <CheckboxField name="votingEligibility" label="voting_eligibility" />
      <HiddenContent label="date_of_registration">
        <DateRangeField name="dateOfRegistration" />
      </HiddenContent>
      <MultipleCheckboxField
        name="preferences"
        label="preferences"
        options={preferencesOptions}
      />
    </>
  )
}

export default ResidentsFiltersDrawerContent
