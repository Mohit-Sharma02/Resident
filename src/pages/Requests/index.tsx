import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-ui/core'
import { useQuery } from 'react-query'

import BaseDataTable from 'src/components/BaseDataTable'
import ItemAvatar from 'src/components/BaseDataTable/ItemAvatar'
import ItemDate from 'src/components/BaseDataTable/ItemDate'
import ItemDescription from 'src/components/BaseDataTable/ItemDescription'
import ItemGPSLocation from 'src/components/BaseDataTable/ItemGPSLocation'
import ItemStatus from 'src/components/BaseDataTable/ItemStatus'
import TableHeaderCell from 'src/components/BaseDataTable/TableHeaderCell'
import { usePage } from 'src/hooks/usePage'
import { getRequests } from 'src/services/firebase/getRequests'
import { Paginated } from 'src/types/Paginated'
import { Request } from 'src/types/Request'

const RequestsPage: React.FC = () => {
  const { page, entriesPerPage } = usePage()

  const { data, isLoading, error, refetch } = useQuery<
    Paginated<Request>,
    Error
  >(['requests', page, entriesPerPage], ({ queryKey }) =>
    getRequests(queryKey[1], queryKey[2]),
  )

  return (
    <>
      <BaseDataTable
        isLoading={isLoading}
        error={error}
        page={page}
        totalPages={data?.totalPages}
        columns={14}
        refetch={refetch}
        header={
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Resident</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Assignee</TableHeaderCell>
            <TableHeaderCell>Priority</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Create Date</TableHeaderCell>
            <TableHeaderCell>Comment Count</TableHeaderCell>
            <TableHeaderCell>Like Count</TableHeaderCell>
            <TableHeaderCell>DisLike Count</TableHeaderCell>
            <TableHeaderCell>GPS Location</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        }
      >
        {data?.entries.map((item) => (
          <tr key={item.id}>
            <td>#{item.id}</td>
            <td>
              <ItemAvatar
                src={item.resident_avatar}
                name={item.resident_name}
              />
            </td>
            <td>
              <ItemDescription>{item.description}</ItemDescription>
            </td>
            <td>
              <ItemAvatar
                src={item.assignee_avatar}
                name={item.assignee_name}
              />
            </td>
            <td>
              <ItemStatus>{item.priority}</ItemStatus>
            </td>
            <td>
              <ItemStatus>{item.status}</ItemStatus>
            </td>
            <td>
              <ItemAvatar src={item.image} />
            </td>
            <td>{item.formatted_address}</td>
            <td>
              <ItemDate date={item.created_date} />
            </td>
            <td>{item.comment_count}</td>
            <td>{item.likes_count}</td>
            <td>{item.dislike_count}</td>
            <td>
              <ItemGPSLocation gps_location={item.gps_location} />
            </td>
            <td>
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
          </tr>
        ))}
      </BaseDataTable>
    </>
  )
}

export default RequestsPage
