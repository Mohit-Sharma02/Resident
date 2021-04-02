import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-ui/core'
import { useQuery } from 'react-query'

import BaseDataTable from 'src/components/BaseDataTable'
import ItemAvatar from 'src/components/BaseDataTable/ItemAvatar'
import ItemDate from 'src/components/BaseDataTable/ItemDate'
import ItemDescription from 'src/components/BaseDataTable/ItemDescription'
import ItemStatus from 'src/components/BaseDataTable/ItemStatus'
import TableHeaderCell from 'src/components/BaseDataTable/TableHeaderCell'
import { usePage } from 'src/hooks/usePage'
import { getAppreciations } from 'src/services/firebase/getAppreciations'
import { Appreciation } from 'src/types/firebase/Appreciation'
import { Paginated } from 'src/types/Paginated'

const AppreciationsPage: React.FC = () => {
  const { page, entriesPerPage } = usePage()

  const { data, isLoading, error, refetch } = useQuery<
    Paginated<Appreciation>,
    Error
  >(['appreciations', page, entriesPerPage], ({ queryKey }) =>
    getAppreciations(queryKey[1], queryKey[2]),
  )

  return (
    <>
      <BaseDataTable
        isLoading={isLoading}
        error={error}
        page={page}
        totalPages={data?.totalPages}
        columns={10}
        refetch={refetch}
        header={
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Resident</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>City Responder</TableHeaderCell>
            <TableHeaderCell>Priority</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Create Date</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
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
              <ItemStatus>{item.category}</ItemStatus>
            </td>
            <td>
              <ItemAvatar
                src={item.responder_avatar}
                name={item.responder_name}
              />
            </td>
            <td>
              <ItemStatus>{item.priority}</ItemStatus>
            </td>
            <td>
              <ItemStatus>{item.status}</ItemStatus>
            </td>
            <td>
              <ItemDate date={item.created_date} />
            </td>
            <td>
              <ItemDate date={item.due_date} />
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

export default AppreciationsPage
