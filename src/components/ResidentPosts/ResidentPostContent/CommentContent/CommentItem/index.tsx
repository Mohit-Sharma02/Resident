import React from 'react'

import { Avatar } from '@material-ui/core'

import { getDaysAgo } from 'src/helpers/formatDate'
import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import { CommentItem as ICommentItem } from 'src/services/firebase/social/getComments'
type CommentItemProps = {
  item: ICommentItem
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {
  const translate = useTranslate()

  return (
    <div className="d-flex flex-row my-3">
      <div>
        {item?.avatar && item?.avatar !== '' ? (
          <Avatar
            alt={item?.name}
            src={item?.avatar}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: avatarService(item.name[0]),
              color: 'white',
              width: 40,
              height: 40,
            }}
          >
            {item?.name[0]}
          </Avatar>
        )}
      </div>
      <div className="ml-2">
        <div className="font-size-sm font-weight-bold">{item.name}</div>
        <div className="font-size-sm text-secondary-text">{item.comment}</div>
        <div className="font-size-xs text-text-gray">
          {getDaysAgo(item.created_date.toDate())}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
