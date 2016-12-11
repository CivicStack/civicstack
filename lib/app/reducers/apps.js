const orderBy = require('lodash.orderby')
const some = require('lodash.some')

const initialState = {
  items: [],
  allItems: [],
  invalid: true,
  fetching: false,
  filters: {},
  error: null
}

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_APPS':
      return Object.assign({}, state, {
        error: null,
        invalid: true,
        fetching: true
      })
    case 'RECEIVE_APPS':
      return Object.assign({}, state, {
        error: null,
        invalid: false,
        fetching: false,
        allItems: action.apps,
        items: action.apps
      })
    case 'FAIL_RECEIVING_APPS':
      return Object.assign({}, state, {
        error: action.error,
        invalid: true,
        fetching: false
      })
    case 'FILTER_APPS':
      return Object.assign({}, state, {
        filters: action.filters,
        items: orderBy(state.allItems.filter(i => action.filters.tags && some(i.tags, tag => action.filters.tags.indexOf(tag) >= 0)),
          [action.filters.sort, action.filters.order])
      })
    case 'CLEAR_APPS_FILTERS':
      return Object.assign({}, state, {
        filters: {},
        items: state.allItems
      })
    default:
      return state
  }
}
