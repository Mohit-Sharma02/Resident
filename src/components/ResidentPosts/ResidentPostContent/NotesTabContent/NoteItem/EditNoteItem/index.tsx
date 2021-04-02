import React, { useCallback, useEffect, useMemo } from 'react'

import { Button, CircularProgress } from '@material-ui/core'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Mention, MentionsInput } from 'react-mentions'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useTranslate } from 'src/locale'
import { getAllEmployees } from 'src/services/firebase/getAllEmployees'
import { InternalNote } from 'src/services/firebase/social/getInternalNotes'
import { updateInternalNote } from 'src/services/firebase/social/updateInternalNote'

type EditNoteItemProps = {
  item: InternalNote
  onCancelEdit: () => void
  postId: string
  type: string
}

type FormData = {
  note: string
}

const EditNoteItem: React.FC<EditNoteItemProps> = ({
  item,
  onCancelEdit,
  postId,
  type,
}) => {
  const methods = useForm()
  const translate = useTranslate()
  const queryClient = useQueryClient()

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    refetch: refetchEmployee,
  } = useQuery(['employees'], () => getAllEmployees())

  const assignedOptions = useMemo(
    () =>
      (employeesData &&
        employeesData.entries?.map((employee, idx) => {
          return {
            display: employee?.first_name + ' ' + employee?.last_name,
            id: employee?.first_name + ' ' + employee?.last_name,
          }
        })) ??
      [],
    [employeesData],
  )

  const { mutateAsync, isLoading } = useMutation(updateInternalNote)

  const onSubmit = useCallback(
    async (data: FormData) => {
      await mutateAsync({
        note: data.note,
        noteId: item.id,
        postId,
        type,
      })
      queryClient.refetchQueries(['internalNotes', type, postId])
      onCancelEdit()
    },
    [item, postId, type, mutateAsync, queryClient, onCancelEdit],
  )

  useEffect(() => {
    methods.setValue('note', item.note)
  }, [item, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="d-flex flex-column">
          <Controller
            control={methods.control}
            name="note"
            defaultValue={item.note}
            render={({ onChange, onBlur, value }) => {
              return (
                <MentionsInput
                  singleLine
                  value={value}
                  className="comments-textarea"
                  inputRef={methods.register}
                  onChange={(e, newValue, newPlainTextValue) =>
                    onChange(newPlainTextValue)
                  }
                  name="note"
                  disabled={isLoading}
                  placeholder={translate('write_comment')}
                  style={{ width: '100%' }}
                >
                  <Mention trigger="@" data={assignedOptions} />
                </MentionsInput>
              )
            }}
          />
          <div className="ml-auto d-flex align-items-center mt-2">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2"
              variant="outlined"
              size="small"
              disabled={isLoading}
            >
              Save
              {isLoading && <CircularProgress className="ml-2" size={15} />}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default EditNoteItem
