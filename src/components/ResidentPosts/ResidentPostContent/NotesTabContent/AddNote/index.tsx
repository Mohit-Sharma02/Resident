import React, { useCallback, useMemo } from 'react'

import { Avatar } from '@material-ui/core'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Mention, MentionsInput } from 'react-mentions'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import { getAllEmployees } from 'src/services/firebase/getAllEmployees'
import { addInternalNote } from 'src/services/firebase/social/addInternalNote'
import './styles.scss'

type AddNoteProps = {
  src: string
  postId: string
  type: string
}

type FormData = {
  note: string
}

const AddNote: React.FC<AddNoteProps> = ({ src, postId, type }) => {
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

  const { mutateAsync, isLoading } = useMutation(addInternalNote)

  const showImage = () => {
    const storage: any = window.localStorage
    const user = JSON.parse(storage.getItem('user'))
    if (user && user.photoURL) {
      return user.photoURL
    } else if (user && user.displayName) {
      return user.displayName.charAt(0)
    }

    return 'u'
  }

  const onSubmit = useCallback(
    async ({ note }: FormData) => {
      if (note) {
        await mutateAsync({
          note,
          postId,
          type,
        })
      }
      methods.reset()
      queryClient.refetchQueries(['internalNotes', type, postId])
    },
    [mutateAsync, postId, type, methods, queryClient],
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="d-flex border-top py-4">
          {showImage().length === 1 ? (
            <Avatar
              className="mr-3"
              style={{
                backgroundColor: avatarService(showImage()),
                color: 'white',
                width: 60,
                height: 60,
              }}
            >
              {showImage()}
            </Avatar>
          ) : (
            <Avatar
              className="mr-3"
              alt={showImage()}
              src={showImage()}
              style={{ width: 60, height: 60 }}
            />
          )}
          <Controller
            control={methods.control}
            name="note"
            render={({ onChange, onBlur, value }) => {
              return (
                <MentionsInput
                  singleLine
                  value={value}
                  className="comments-textarea"
                  inputRef={methods.register}
                  appendSpaceOnAdd={true}
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
        </div>
      </form>
    </FormProvider>
  )
}

export default AddNote
