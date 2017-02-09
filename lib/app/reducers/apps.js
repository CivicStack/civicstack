const orderBy = require('lodash.orderby')
const some = require('lodash.some')

const initialState = {
  items: [],
  allItems: [],
  invalid: true,
  fetching: false,
  filters: {
    countries: [],
    technologies: [],
    tags: []
  },
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
    // case 'FILTER_APPS':
    //   return Object.assign({}, state, {
    //     filters: action.filters,
    //     items: orderBy(state.allItems.filter(i => action.filters.tags && some(i.tags, tag => action.filters.tags.indexOf(tag) >= 0)),
    //       [action.filters.sort, action.filters.order])
    //   })
    // case 'CLEAR_APPS_FILTERS':
    //   return Object.assign({}, state, {
    //     filters: {},
    //     items: state.allItems
    //   })

    case 'FILTER_APPS':
      const filterByCountries = (items = [], countries = []) => countries.length
        ? items.filter(({ country }) => countries.includes(country.id))
        : items
      const filterByTechnologies = (items = [], technologies = []) => technologies.length
        ? items.filter(({ technology }) => technologies.some(t => technology.includes(t)))
        : items
      const filterByTags = (items = [], tags = []) => tags.length
        ? items.filter(({ tag }) => tags.some(t => tag.includes(t)))
        : items

      return Object.assign({}, state, {
        filters: action.filters,
        items: filterByTags(filterByTechnologies(filterByCountries(state.allItems, action.filters.countries), action.filters.technologies), action.filters.tags)
      })
    default:
      return state
  }
}
