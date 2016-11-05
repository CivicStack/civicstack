const initialState = {
  items: [],
  invalid: true,
  fetching: false,
  filters: [],
  error: null
}

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_APPS':
      return {
        ...state,
        error: null,
        invalid: true,
        fetching: true
      }
    case 'RECEIVE_APPS':
      return {
        ...state,
        error: null,
        invalid: false,
        fetching: false,
        items: action.apps
      }
    case 'FAIL_RECEIVING_APPS':
      return {
        ...state,
        error: action.error,
        invalid: true,
        fetching: false
      }
    case 'FILTER_APPS':
      return {
        ...state,
        filters: action.filters
      }
    case 'CLEAR_APPS_FILTERS':
      return {
        ...state,
        filters: []
      }
    default:
      return state
  }
}
