import React, { forwardRef, useCallback, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { IoMdArchive } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import BaseDrawer, { BaseDrawerActions } from 'src/components/BaseDrawer'
import { useTranslate } from 'src/locale'
import { getTypeStatus } from 'src/services/firebase/getTypeStatus'
import { archiveResidentPost } from 'src/services/firebase/social/archiveResidentPost'
import { getResidentPost } from 'src/services/firebase/social/getResidentPost'

import ResidentPostContent from '../ResidentPostContent'

type ResidentPostContentDrawer = {
  postId?: string
  type: string
  updated?: any
}

const ResidentPostContentDrawer: React.ForwardRefRenderFunction<
  BaseDrawerActions,
  ResidentPostContentDrawer
> = ({ postId, type, updated }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const translate = useTranslate()
  const handleClose = () => {
    setIsOpen(false)
  }

  const queryClient = useQueryClient()

  const {
    data: postData,
    isLoading: isPostLoading,
    refetch: refetchPost,
  } = useQuery(
    ['residentPost', postId, type],
    ({ queryKey }) =>
      getResidentPost({
        postId: queryKey[1],
        type: queryKey[2],
      }),
    {
      keepPreviousData: false,
    },
  )

  const { data: postStatus, isLoading: isLoadingStatus } = useQuery(
    ['postStatus'],
    () => getTypeStatus(),
  )

  const { mutateAsync: mutateArchive } = useMutation(archiveResidentPost)

  const handleArchiveItemConfirmation = () => {
    setIsOpen(true)
  }

  const handleArchiveItem = useCallback(async () => {
    if (postId) {
      await mutateArchive({
        postId,
        type,
      })
      queryClient.refetchQueries(['residentPost', postId, type])
    }
    handleClose()
  }, [postId, type, mutateArchive, queryClient])

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{translate('archived_posts')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translate('delete_post_warning')}
          </DialogContentText>
          <DialogContentText>
            {translate('post_related_information')}
          </DialogContentText>
          <DialogContentText>
            {translate('post_in_archive_folder')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {translate('action_cancel')}
          </Button>
          <Button
            onClick={handleArchiveItem}
            variant="contained"
            color="primary"
          >
            {translate('archived_posts')}
          </Button>
        </DialogActions>
      </Dialog>
      <BaseDrawer
        ref={ref}
        isLoading={isPostLoading || isLoadingStatus}
        actions={
          <Button
            type="button"
            className="px-4 py-2 h-auto text-danger border-1 border-danger badge badge-neutral-danger"
            variant="outlined"
            onClick={handleArchiveItemConfirmation}
            disabled={postData?.isArchived}
          >
            <IoMdArchive style={{ color: 'red' }} className="mr-3" />
            {translate('archive_key')}
          </Button>
        }
      >
        <ResidentPostContent
          data={postData}
          postStatus={postStatus}
          type={type}
          updated={() => {
            refetchPost()
            if (updated) {
              updated()
            }
          }}
        />
      </BaseDrawer>
    </>
  )
}

export default forwardRef(ResidentPostContentDrawer)
