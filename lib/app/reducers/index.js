const { combineReducers } = require('redux')

const meta = require('./meta')
const apps = require('./apps')

module.exports = combineReducers({ meta, apps })
