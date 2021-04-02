/**
 * A function that create an action creator and an action type with Typescript's type safe.
 */
export default function createAction(type) {
  // Sanity check for type arg
  if (typeof type !== 'string') {
    throw new Error(
      `Expected the argument actionType to be of type string, but type '${typeof type}' was passed instead.`,
    )
  }

  const actionCreator = (payload) => {
    return { type, payload }
  }

  return { actionCreator, actionType: type }
}
