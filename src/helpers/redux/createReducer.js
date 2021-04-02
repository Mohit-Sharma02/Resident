export default function createReducer(initialState, handlers) {
  // Sanity check for 'undefined' action type
  if (handlers.undefined)
    throw new Error("Reducer contains an 'undefined' action type.")

  return function reducer(state = initialState, action) {
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}
