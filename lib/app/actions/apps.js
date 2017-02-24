const { get, post } = require('../utils/http')

module.exports.fetchApps = () => (dispatch, getState) => {
  dispatch(requestApps())
  get('/api/applications/approved')
    .then(response => response.status >= 400 ? dispatch(failReceivingApps(response.status)) : response.json())
    .then(data => dispatch(receiveApps(data)))
    .catch(err => dispatch(failReceivingApps(err)))
}

const requestApps = () => ({
  type: 'REQUEST_APPS'
})

const receiveApps = apps => ({
  type: 'RECEIVE_APPS',
  apps
})

const failReceivingApps = error => ({
  type: 'FAIL_RECEIVING_APPS',
  error
})

module.exports.filterApps = filters => ({
  type: 'FILTER_APPS',
  filters
})

export const clearAppsFilters = () => ({
  type: 'CLEAR_APPS_FILTERS'
})

module.exports.searchApps = searchPredicate => ({
  type: 'SEARCH_APPS',
  searchPredicate
})

export const addUpvote = applicationId => (dispatch, getState) => {
  dispatch(setUpvoted(applicationId))
  post(`/api/applications/${applicationId}/upvote`).catch(() => dispatch(clearUpvote(applicationId)))
}

const setUpvoted = applicationId => ({
  type: 'SET_UPVOTED',
  applicationId
})

const clearUpvote = applicationId => ({
  type: 'CLEAR_UPVOTE',
  applicationId
})
