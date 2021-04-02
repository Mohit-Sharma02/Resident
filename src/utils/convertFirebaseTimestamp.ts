/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import firebase from 'firebase'
import moment from 'moment'

const Timestamp = firebase.firestore.Timestamp

export function convertTimestampToDate(timestamp?: any): Date | unknown {
  const formatFirebaseTimeStamp =
    timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp

  const myDate = new Date(formatFirebaseTimeStamp)

  const formatedTime = moment(myDate).fromNow()

  return formatedTime
}
