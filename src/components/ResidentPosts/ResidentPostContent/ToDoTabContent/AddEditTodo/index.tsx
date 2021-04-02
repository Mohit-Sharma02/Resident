import React, { useCallback, useRef, useState } from 'react'

import { Button, Grid, LinearProgress, Tooltip } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import SelectField from 'src/components/CustomFields/SelectField'
import Input from 'src/components/FormFields/Input'
import { useTranslate } from 'src/locale'
import {
  addToDoPost,
  uploadToDoImage,
} from 'src/services/firebase/social/addToDoPost'
import { updateTodoPost } from 'src/services/firebase/social/updateTodoPost'

import { ReactComponent as UploadIcon } from '../../../../../assets/svg/icons/feature_upload.svg'
import ResidentPostFieldGroup from '../../ResidentPostFieldGroup'

type AddEditTodoProps = {
  assignedOptions: any
  handleCloseAddTodo: any
  handleSelectedTodo: any
  handleOpenFiles: any
  item: any
  type: string
  postId: string
}

type FormData = {
  toDo: any
}

const AddEditTodo: React.FC<AddEditTodoProps> = ({
  assignedOptions,
  handleCloseAddTodo,
  handleOpenFiles,
  handleSelectedTodo,
  postId,
  item,
  type,
}) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues:
      item !== null
        ? {
            title: item.title,
            description: item.description,
            dueDate: item.due_date,
            assignedTo: item.assignee.assigned_to.id,
          }
        : {
            title: '',
            description: '',
            dueDate: '',
            assignedTo: '',
          },
  })

  const inputFile = useRef(null)

  const { mutateAsync: mutateAddTodoPost } = useMutation(addToDoPost)
  const { mutateAsync: mutateEditTodoPost } = useMutation(updateTodoPost)
  const [selectedFile, setSelectedFile] = useState(
    item !== null ? item.files : [],
  )
  const translate = useTranslate()
  const [loading, setLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(addToDoPost)

  const handleRemoveFiles = (i) => {
    const filesArray = [...selectedFile]
    if (i !== -1) {
      filesArray.splice(i, 1)
      setSelectedFile(filesArray)
    }
  }

  const handleFileUploadChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setLoading(true)
      uploadToDoImage(file).then((fileURL) => {
        setSelectedFile([...selectedFile, fileURL])
        setLoading(false)
      })
    }
  }

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      setLoading(true)
      const selectEmployee = assignedOptions.find(
        (emp) => emp.id === formData.assignedTo,
      )
      if (item !== null) {
        await mutateEditTodoPost({
          postId,
          type,
          selectEmployee,
          selectedFile,
          ToDoID: item.id,
          ...formData,
        })
      } else {
        await mutateAddTodoPost({
          postId,
          type,
          selectedFile,
          selectEmployee,
          ...formData,
        })
      }
      setTimeout(() => {
        queryClient.refetchQueries(['toDolists', type, postId])
        handleCloseAddTodo(false)
        handleSelectedTodo({})
        setLoading(false)
      }, 5000)
    },
    [postId, selectedFile, type, mutateAddTodoPost],
  )

  return (
    <>
      {loading && <LinearProgress className="mb-4" />}
      <div className="text-secondary-text font-weight-600 mb-4">
        {' '}
        {translate('create_todo_post')}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <ResidentPostFieldGroup label="title_key">
            <Input label="title_key" placeholder="title_key" name="title" />
          </ResidentPostFieldGroup>
          <ResidentPostFieldGroup label="description">
            <Input
              label="description"
              placeholder="description"
              name="description"
            />
          </ResidentPostFieldGroup>
          <ResidentPostFieldGroup label="assigned_to">
            <SelectField
              disabled={false}
              name="assignedTo"
              options={assignedOptions}
            />
          </ResidentPostFieldGroup>
          <ResidentPostFieldGroup label="due_date">
            <Input
              label="due_date"
              type="date"
              placeholder="due_date"
              name="dueDate"
            />
          </ResidentPostFieldGroup>
          <div className="d-flex">
            <div className="mr-auto p-2">
              {selectedFile &&
                selectedFile.length > 0 &&
                selectedFile.map((file, index) => (
                  <div className="thumb" key={index}>
                    <div className="thumbInner">
                      <>
                        <Tooltip title={file.Name} arrow placement="top">
                          <span onClick={() => handleOpenFiles(file)}>
                            {file.Name}
                          </span>
                        </Tooltip>
                      </>
                      <Button
                        size="small"
                        onClick={() => handleRemoveFiles(index)}
                        className="btn"
                      >
                        X
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <div
              onClick={() => inputFile.current.click()}
              className="pointer-event upload-icon-text"
            >
              <UploadIcon />
              <p className="ml-2">{translate('attach_files')}</p>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={handleFileUploadChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="d-flex">
            <Grid container>
              <Grid xs={5} />
              <Grid xs={3} className="mr-4">
                <Button
                  onClick={() => {
                    handleCloseAddTodo(false)
                    handleSelectedTodo({})
                  }}
                  variant="outlined"
                  className="mb-4 mt-4 "
                  fullWidth
                  style={{ height: '50px' }}
                >
                  {translate('action_cancel')}
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  type="submit"
                  variant="outlined"
                  className="mb-4 mt-4"
                  fullWidth
                  color="primary"
                  style={{ height: '50px' }}
                >
                  {loading
                    ? `${translate('autocomplete_loading')}`
                    : item !== null
                    ? `${translate('update')}`
                    : `${translate('action_add')}`}
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddEditTodo
