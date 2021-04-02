import React from 'react'

import { LinearProgress } from '@material-ui/core'

import { HistoryItem as IHistoryItem } from 'src/services/firebase/social/getHistory'

import HistoryItem from './HistoryItem'
import styles from './styles.module.scss'

type HistoryTabContentProps = {
  isLoading?: boolean
  items: IHistoryItem[]
  postId: string
  type: string
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({
  isLoading,
  items,
  postId,
  type,
}) => {
  return (
    <>
      {isLoading && <LinearProgress className="mb-4" />}
      <div className={styles.container}>
        <div className={styles.containerItems}>
          {items.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HistoryTabContent
