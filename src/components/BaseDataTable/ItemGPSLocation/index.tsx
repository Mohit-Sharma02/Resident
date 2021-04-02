import React from 'react'

type ItemGPSProps = {
  gps_location: {
    u_: number
    h_: number
  }
}

const ItemGPSLocation: React.FC<ItemGPSProps> = ({ gps_location }) => {
  return (
    <div>
      Latitude: {gps_location.u_}
      <br />
      Longitude: {gps_location.h_}
    </div>
  )
}

export default ItemGPSLocation
