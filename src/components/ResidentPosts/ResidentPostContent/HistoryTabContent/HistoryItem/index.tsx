import React from 'react'

import { Avatar } from '@material-ui/core'
import uuid from 'react-uuid'

import { formatType } from 'src/helpers/formatAction'
import { formatDate } from 'src/helpers/formatDate'
import { useTranslate } from 'src/locale'
import { avatarService } from 'src/services/avatarService'
import { HistoryItem as IHistoryItem } from 'src/services/firebase/social/getHistory'
type HistoryItemProps = {
  item: IHistoryItem
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const translate = useTranslate()

  return (
    <div className="mb-4">
      <div className="d-flex mb-2">
        {item.initiatedBy.avatar ? (
          <Avatar
            alt={item.initiatedBy.name}
            src={item.initiatedBy.avatar}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: avatarService(item.initiatedBy.name[0]),
              color: 'white',
              width: 40,
              height: 40,
            }}
          >
            {item.initiatedBy.name[0]}
          </Avatar>
        )}
        <div className="ml-3 w-100">
          <div className="mt-2 d-flex align-items-center w-100 mb-3">
            <div className="font-size-sm">
              <span className="font-weight-600 title-color">
                {item.initiatedBy.name}
              </span>{' '}
              {item?.action && (
                <span className="text-secondary-text font-weight-500">
                  {translate(`history_${item?.action}`)}
                </span>
              )}{' '}
              <span className="font-weight-500 title-color">
                {translate(item.type)}
              </span>
              <span className="font-weight-bold">{formatType(item.type)}</span>
            </div>
            <div className="ml-auto font-size-xs text-secondary-text">
              {formatDate(item.createdDate)}
            </div>
          </div>
        </div>
      </div>
      {item?.information && (
        <div className="ml-5 mb-3 bg-secondary text-text-secondary border rounded-sm p-3">
          {item?.information?.map((it) => (
            <div key={uuid()}>
              {it.label !== '' ? `${translate(it.label)}:` : ''}{' '}
              {it.value !== '' ? translate(it.value) : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryItem
