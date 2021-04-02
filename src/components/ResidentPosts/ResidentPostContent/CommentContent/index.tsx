import React from 'react'

import { Button, LinearProgress } from '@material-ui/core'

import { getDaysAgoString, groupByDate } from 'src/helpers/formatDate'
import { useTranslate } from 'src/locale'
import { CommentItem as ICommentItem } from 'src/services/firebase/social/getComments'

import CommentItem from './CommentItem'

type CommentContentProps = {
  isLoading?: boolean
  items: ICommentItem[]
  postId: string
  type: string
  callBack: any
}

const CommentContent: React.FC<CommentContentProps> = ({
  isLoading,
  items,
  postId,
  type,
  callBack,
}) => {
  const itemsSorted = groupByDate(items)
  const translate = useTranslate()

  return (
    <div className="bg-lighter m-0 py-3 px-4">
      {isLoading && <LinearProgress className="mb-4" />}
      <div style={{ maxHeight: 700, overflow: 'auto' }}>
        <div className="d-flex flex-row align-items-center justify-content-center border-bottom mb-4">
          <h4 style={{ flex: 1 }} className="text-center pl-5">
            {translate('comments')}
          </h4>
          <Button
            onClick={() => {
              if (callBack) {
                callBack()
              }
            }}
            className="btn-link font-size-lg"
          >
            X
          </Button>
        </div>
        <div>
          {itemsSorted.map((item) => (
            <div key={item.label}>
              <div className="text-secondary-text font-weight-bold my-2">
                {getDaysAgoString(item.value[0].created_date.toDate())}
              </div>
              {item.value.map((it) => (
                <CommentItem key={it.id} item={it} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentContent
