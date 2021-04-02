import React, { useState } from 'react'

import { Avatar, Table } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import uuid from 'react-uuid'

export default function DataTable(props) {
  const [entries, setEntries] = useState('1')

  const handleChange = (event) => {
    setEntries(event.target.value)
  }

  return (
    <>
      <div className="pt-4 ">
        <Table className="table table-alternate-spaced text-nowrap mb-0">
          <thead className="bg-white font-size-sm table-heading text-uppercase p-2">
            <tr>
              {props.tableData.head.map((item) => (
                <th className="bg-white text-left p-4" key={uuid()}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-heading">
            {props.tableData.data.map((row) => (
              <>
                <tr key={uuid()}>
                  <td className="text-primary-text">
                    <span>#{row.id}</span>
                  </td>
                  <td className="text-primary-text">
                    <span>{row.publisher.name}</span>
                  </td>
                  <td className="text-primary-text">
                    <span>{row.subject}</span>
                  </td>
                  <td>
                    {row.assignee && <Avatar src={row.assignee.avatar} />}
                  </td>
                  <td className="text-primary-text">
                    <span>{row.priority}</span>
                  </td>
                  <td className="text-primary-text">
                    <span>{row.status}</span>
                  </td>
                  <td className="text-primary-text">
                    <span>{row.posted}</span>
                  </td>
                  <td className="text-primary-text">
                    <span>{row.lastResponded}</span>
                  </td>
                  <td className="text-primary-text">#{row.id}</td>
                </tr>
                <tr className="divider" />
              </>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="p-4 d-flex justify-content-center">
        <Pagination className="pagination-primary" count={10} />
      </div>
    </>
  )
}
