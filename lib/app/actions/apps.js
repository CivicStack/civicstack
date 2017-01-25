const fetch = require('isomorphic-fetch')

module.exports.fetchApps = () => (dispatch, getState) => {
  dispatch(requestApps())
  fetch('/api/applications/approved', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
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

export const filterApps = filters => ({
  type: 'FILTER_APPS',
  filters
})

export const clearAppsFilters = () => ({
  type: 'CLEAR_APPS_FILTERS'
})

export const filterByCountries = countryIDs => ({
  type: 'FILTER_APPS_BY_COUNTRIES',
  countryIDs
})
