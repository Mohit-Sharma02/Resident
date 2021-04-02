import React, { useCallback } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import SwitchField from 'src/components/FilterDrawer/fields/SwitchField'

import { ResidentPostsType } from './types'

type ResidentPostActionProps = {
  type: ResidentPostsType
  onSubmit: (data: any) => void
  onSwitchChange: (name: any, data: any) => void
  defaultValues?: Record<string, unknown>
}

const ResidentPostAction: React.FC<ResidentPostActionProps> = ({
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
            name={`createdOn`}
            label="post_created_date"
            onSwitchChange={onSwitchChange}
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`department`}
            label="department_name"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`postId`}
            label="post_id"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`createdBy`}
            label="created_by"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`location`}
            label="location_live"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`category`}
            label="category"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`subCategory`}
            label="sub_category"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`viewPostOnHover`}
            label="view_post_on_hover"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`status`}
            label="status_live"
          />
          <SwitchField
            onSwitchChange={onSwitchChange}
            name={`archived`}
            label="Archived"
          />
        </form>
      </FormProvider>
    </>
  )
}

export default ResidentPostAction
