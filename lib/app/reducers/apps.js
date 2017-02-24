const Fuse = require('fuse.js')

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
  fuse: null,
  searchPredicate: '',
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
        items: action.apps,
        fuse: new Fuse(action.apps, { keys: ['name', 'organization', 'description'] })
      })
    case 'FAIL_RECEIVING_APPS':
      return Object.assign({}, state, {
        error: action.error,
        invalid: true,
        fetching: false
      })
    case 'SEARCH_APPS':
      return Object.assign({}, state, {
        searchPredicate: action.searchPredicate,
        items: (action.searchPredicate && state.fuse) ? state.fuse.search(action.searchPredicate) : state.allItems
      })
    case 'FILTER_APPS':
      const filterByCountries = (items = [], countries = []) => countries.length
        ? items.filter(({ country }) => countries.includes(country.id))
        : items
      const filterByTechnologies = (items = [], technologies = []) => technologies.length
        ? items.filter(({ technology }) => technologies.some(t => technology.includes(t)))
        : items
      const filterByTags = (items = [], tags = []) => tags.length
        ? items.filter(item => tags.some(t => item.tags.includes(t)))
        : items

      return Object.assign({}, state, {
        filters: action.filters,
        items: filterByTags(filterByTechnologies(filterByCountries(state.allItems, action.filters.countries), action.filters.technologies), action.filters.tags)
      })
    case 'SET_UPVOTED':
      return Object.assign({}, state, {
        items: state.items.map(app => Object.assign({}, app, {
          upvoted: app.id === action.applicationId || app.upvoted
        }))
      })
    case 'CLEAR_UPVOTE':
      return Object.assign({}, state, {
        items: state.items.map(app => Object.assign({}, app, {
          upvoted: app.id === action.applicationId ? undefined : app.upvoted
        }))
      })
    default:
      return state
  }
}
