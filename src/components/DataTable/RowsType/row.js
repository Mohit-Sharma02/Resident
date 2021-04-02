import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-ui/core'

import {
  Avatar,
  Date,
  Id,
  Status,
  Text,
} from 'src/components/DataTable/RowsType'
export default function Row(props) {
  return (
    <>
      {props.type === 'id' && <Id data={props.data} />}
      {props.type === 'avatar' && (
        <Avatar
          avatar={props.avatar}
          data={props.data}
          subTitle={props.extraData}
        />
      )}
      {props.type === 'text' && <Text data={props.data} />}
      {props.type === 'status' && <Status data={props.data} />}
      {props.type === 'date' && <Date data={props.data} />}
      {props.type === 'action' && (
        <td className="text-center">
          <Button
            size="small"
            className="btn-link d-30 p-0 btn-icon hover-scale-sm"
          >
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
              className="font-size-lg text-secondary-text"
            />
          </Button>
        </td>
      )}
    </>
  )
}
