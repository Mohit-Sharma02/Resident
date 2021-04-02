import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, CircularProgress, TextField } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import uuid from 'react-uuid'

import ChipSelectField from 'src/components/CustomFields/ChipSelectField'
import DateRangePicker from 'src/components/CustomFields/DateRangePicker'
import SelectField from 'src/components/CustomFields/SelectField'
import MuiAutoComplete from 'src/components/MuiAutoComplete'
import { formatResidentPostType } from 'src/helpers/formatResidentPostType'
import { useTranslate } from 'src/locale'
import { destroyWatchers } from 'src/services/firebase/destroyWatcher'
import { getAllEmployees } from 'src/services/firebase/getAllEmployees'
import { getDepartments } from 'src/services/firebase/getDepartments'
import { getWatchers } from 'src/services/firebase/getWatchers'
import { insertWatchers } from 'src/services/firebase/insertWatchers'
import { ResidentPostItem } from 'src/services/firebase/social/getResidentPosts'
import { updateResidentPost } from 'src/services/firebase/social/updateResidentPost'

import ResidentPostFieldGroup from '../ResidentPostFieldGroup'
import '../../../../assets/custom/overviewTabContent.scss'

type FormData = {
  status: string
  assignedTo: {
    id: string
    name: string
  }
  dateRange: {
    from: Date
    to: Date
  }
}

type OverviewTabContentProps = {
  data: ResidentPostItem
  postStatus: any
  type: string
  update?: any
  disabled?: boolean
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  data: postData,
  type,
  postStatus,
  update,
  disabled = false,
}) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      status: postData.status.current.status,
      dateRange: postData.dateRange,
      assignedTo: postData.assignee?.department,
    },
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [watcherLoading, setWatcherLoading] = useState<boolean>(false)
  const [insertWatcher, setInsertWatcher] = useState<boolean>(false)
  const [insertWatcherList, setInsertWatcherList] = useState([])
  const [employeeOpt, setEmployeeOpt] = useState<boolean>(false)
  const translate = useTranslate()
  const { data: departments } = useQuery('departments', getDepartments)
  const {
    data: watchersData,
    isLoading: watchersDataLoading,
    refetch: refetchWatchers,
  } = useQuery(
    ['watchers', type, postData],
    ({ queryKey }) =>
      getWatchers({
        type: queryKey[1],
        id: queryKey[2].id,
      }),
    { keepPreviousData: false },
  )
  const { mutateAsync: mutateInsertWatchers } = useMutation(insertWatchers)
  const { mutateAsync: mutateDestroyWatchers } = useMutation(destroyWatchers)
  const departmentOptions = useMemo(
    () =>
      departments?.map((it) => ({
        label: translate(it.department_label),
        value: { id: it.id, name: it.department },
      })) ?? [],
    [departments],
  )
  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    refetch: refetchEmployee,
  } = useQuery(['employees'], () => getAllEmployees())

  const currentList = () => {
    let list = []

    if (type === 'requests') {
      list = postStatus.request.statuses
    } else if (type === 'suggestions') {
      list = postStatus.suggestion.statuses
    } else if (type === 'appreciations') {
      list = postStatus.appreciation.statuses
    }

    return list
  }

  const list = currentList()

  const statusOption = useMemo(
    () =>
      list?.map((it) => ({
        label: translate(it.label_name),
        value: it.label_name,
      })) ?? [],
    [postStatus],
  )

  const { mutateAsync: mutateUpdateResidentPost } = useMutation(
    updateResidentPost,
  )

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      setLoading(true)
      await mutateUpdateResidentPost({
        postId: postData.id,
        type,
        ...formData,
      })
      if (update) {
        update()
      }
      setLoading(false)
    },
    [postData, type, mutateUpdateResidentPost],
  )

  const addWatcher = async (res) => {
    setWatcherLoading(true)
    await mutateInsertWatchers({
      avatar: res.avatar,
      id: res.value,
      name: res.name,
      type: type,
      postId: postData.id,
    })
    setInsertWatcher(false)
    refetchWatchers()
  }

  const removeWatcher = async (id) => {
    setWatcherLoading(true)
    await mutateDestroyWatchers({
      id: id,
      type: type,
      postId: postData.id,
    })
    refetchWatchers()
  }

  useEffect(() => {
    if (employeesData) {
      const employees = employeesData.entries.map((it) => ({
        name: `${it.first_name} ${it.last_name}`,
        value: it.id,
        avatar: it.avatar,
      }))

      setEmployeeOpt(employees)
    }
  }, [employeesData])

  useEffect(() => {
    if (watchersData) {
      setWatcherLoading(false)
    }
  }, [watchersData])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <ResidentPostFieldGroup label="status">
          <ChipSelectField
            disabled={disabled}
            name="status"
            options={statusOption}
          />
        </ResidentPostFieldGroup>
        <ResidentPostFieldGroup label="watchers">
          <div className="d-flex flex-row align-items-center">
            {watcherLoading && <CircularProgress className="ext-primary" />}
            {insertWatcher === false && watcherLoading === false && (
              <>
                <Button
                  className="border text-primary mr-2 d-flex justify-content-center align-items-center btn-plus-watchers"
                  onClick={() => setInsertWatcher(true)}
                >
                  +
                </Button>
                <div className="">
                  {watchersData?.watcher?.map((it) => (
                    <div
                      key={uuid()}
                      className="d-flex flex-row border rounded-lg px-1 py-1 mr-2 mt-1 align-items-center"
                    >
                      {it.avatar && (
                        <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={it.avatar} />
                          </div>
                        </div>
                      )}
                      <div className="mx-1 font-size-xs flex1">{it.name}</div>
                      <Button
                        className="border circle text-white p-0 btn-close-watchers"
                        onClick={() => {
                          removeWatcher(it.id)
                          setInsertWatcher(false)
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
            {insertWatcher === true && watcherLoading === false && (
              <>
                <MuiAutoComplete
                  loading={isLoadingEmployees}
                  callback={(res) => {
                    if (res) {
                      addWatcher(res)
                    }
                  }}
                  options={employeeOpt}
                />
                <Button
                  className="border circle text-white p-0 btn-close-watchers ml-3"
                  onClick={() => setInsertWatcher(false)}
                >
                  X
                </Button>
              </>
            )}
          </div>
        </ResidentPostFieldGroup>
        <ResidentPostFieldGroup label="type">
          <TextField
            variant="outlined"
            fullWidth
            disabled
            value={translate(formatResidentPostType(type))}
          />
        </ResidentPostFieldGroup>
        <ResidentPostFieldGroup label="assigned_to">
          <SelectField
            disabled={disabled}
            name="assignedTo"
            options={departmentOptions}
          />
        </ResidentPostFieldGroup>
        <ResidentPostFieldGroup label="date_range">
          <DateRangePicker disabled={disabled} name="dateRange" />
        </ResidentPostFieldGroup>
        <Button
          type="submit"
          variant="outlined"
          className="mb-4 mt-4 d-flex justfy-content-center align-items-center"
          fullWidth
          disabled={loading || disabled}
          style={{ height: '50px' }}
        >
          {loading && <CircularProgress className="ext-primary" />}
          {!loading && <div>{translate('update')}</div>}
        </Button>
      </form>
    </FormProvider>
  )
}

export default OverviewTabContent
