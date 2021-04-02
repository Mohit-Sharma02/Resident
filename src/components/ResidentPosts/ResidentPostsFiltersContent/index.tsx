import React, { useMemo } from 'react'

import { Typography } from '@material-ui/core'
import { useQuery } from 'react-query'

import CheckboxField from 'src/components/FilterDrawer/fields/CheckboxField'
import SelectField from 'src/components/FilterDrawer/fields/SelectField'
import MapFilterDrawerContent from 'src/components/GoogleMapReact/MapFilterDrawerContent'
import { useTranslate } from 'src/locale'
import { getDepartments } from 'src/services/firebase/getDepartments'
import { getTypeStatus } from 'src/services/firebase/getTypeStatus'

import { ReactComponent as AppreciationsIcon } from '../ResidentPostsTableFilters/ResidentPostsTypeList/icons/appreciations.svg'
import { ReactComponent as RequestsIcon } from '../ResidentPostsTableFilters/ResidentPostsTypeList/icons/requests.svg'
import { ReactComponent as SuggestionsIcon } from '../ResidentPostsTableFilters/ResidentPostsTypeList/icons/suggestions.svg'
import { ResidentPostsType } from '../types'
import ResidentPostsDateCreatedFilters from './ResidentPostsDateCreatedFilters'
type ResidentPostsFiltersContentProps = {
  type: ResidentPostsType
}

const ResidentPostsFiltersContent: React.FC<ResidentPostsFiltersContentProps> = ({
  type,
}) => {
  const { data: departments } = useQuery('departments', getDepartments)
  const translate = useTranslate()
  const departmentOptions = useMemo(() => {
    const currentDepartment =
      departments?.map((it) => ({ label: it.department, value: it.id })) ?? []
    currentDepartment.unshift({ label: 'Select option', value: '' })

    return currentDepartment
  }, [departments])

  const { data: postStatus, isLoading: isLoadingStatus } = useQuery(
    ['postStatus'],
    () => getTypeStatus(),
  )

  return (
    <>
      {type === ResidentPostsType.REQUESTS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <RequestsIcon fill="currentColor" /> {translate('requests_live')}
          </Typography>
        </div>
      )}
      {type === ResidentPostsType.SUGGESTIONS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <SuggestionsIcon fill="currentColor" /> {translate('suggestions')}
          </Typography>
        </div>
      )}
      {type === ResidentPostsType.APPRECIATIONS && (
        <div className="styles_container__Fv2l_">
          <Typography
            variant="h6"
            className="text-left drawer_heading font-weight-600"
            gutterBottom
          >
            <AppreciationsIcon fill="currentColor" />{' '}
            {translate('text_appreciations')}
          </Typography>
        </div>
      )}

      {postStatus && type === ResidentPostsType.APPRECIATIONS && (
        <MapFilterDrawerContent
          opened={false}
          nameCategories="appreciations_categories"
          nameStatus="appreciations_status"
          data={postStatus.appreciation}
        />
      )}
      {postStatus && type === ResidentPostsType.SUGGESTIONS && (
        <MapFilterDrawerContent
          opened={false}
          nameCategories="suggestions_categories"
          nameStatus="suggestions_status"
          data={postStatus.suggestion}
        />
      )}
      {postStatus && type === ResidentPostsType.REQUESTS && (
        <MapFilterDrawerContent
          opened={false}
          nameCategories="requests_categories"
          nameStatus="requests_status"
          data={postStatus.request}
        />
      )}

      <ResidentPostsDateCreatedFilters />

      <SelectField
        label="department_name"
        name="department"
        options={departmentOptions}
      />

      <CheckboxField name="unassignedPosts" label="unassigned_posts" />
      <CheckboxField name="archivedPosts" label="archived_posts" />
    </>
  )
}

export default ResidentPostsFiltersContent
