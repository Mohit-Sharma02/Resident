import React from 'react'

type ItemDateProps = {
  date: {
    seconds: number
    nanoseconds: number
  }
}

const ItemDate: React.FC<ItemDateProps> = ({ date }) => {
  return <div>{date.seconds}</div>
}

export default ItemDate
