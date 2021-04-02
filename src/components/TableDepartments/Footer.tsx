import React from 'react'

import { Button } from '@material-ui/core'
import { BeatLoader } from 'react-spinners'

type Props = {
  division?: any
  handleAssignManager?: any
  isLoadingMutateDepartment?: boolean
}

const Footer: React.FC<Props> = ({
  division,
  handleAssignManager,
  isLoadingMutateDepartment,
}) => {
  return isLoadingMutateDepartment ? (
    <div className="d-flex align-items-center justify-content-center">
      <BeatLoader color={'var(--primary)'} loading={true} />
    </div>
  ) : division.manager?.name !== '' ? (
    <div className="d-flex align-items-center">
      <div className="avatar-icon-wrapper avatar-icon-xs mr-3">
        <div className="avatar-icon">
          <img alt="..." src={division.manager?.avatar} />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <span className="name">{division.manager?.name}</span>
      </div>
    </div>
  ) : (
    <>
      <Button
        onClick={() => handleAssignManager()}
        variant="text"
        className="btn-pill m-0 btn-outline-success"
      >
        Assign Manager
      </Button>
    </>
  )
}
export default Footer
