import React, { useCallback } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import SwitchField from 'src/components/FilterDrawer/fields/SwitchField'

import { ResidentType } from './types'

type ResidentActionProps = {
  type: ResidentType
  onSubmit: (data: any) => void
  onSwitchChange: (name: any, data: any) => void
  defaultValues?: Record<string, unknown>
}

const ResidentAction: React.FC<ResidentActionProps> = ({
  defaultValues,
  onSubmit,
  type,
  onSwitchChange,
}) => {
  const methods = useForm({
    defaultValues,
  })
  const handleSubmit = methods.handleSubmit(onSubmit)
  const handleClose = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <>
      <FormProvider {...methods}>
        <form className="p-4" onSubmit={handleSubmit}>
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`avatar`}
            label="avatar"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`fullName`}
            label="fullname"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`address`}
            label="Address"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`phoneNumber`}
            label="phonenumber"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`memberSince`}
            label="member_since"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`noOfPosts`}
            label="no_of_posts"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`noOfFollowers`}
            label="no_of_followers"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`votingEligibility`}
            label="voting_eligibility"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`homeAdderess`}
            label="homeaddressvisibility"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`username`}
            label="using_real_username"
          />
        </form>
      </FormProvider>
    </>
  )
}

export default ResidentAction
