const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const logger = require('redux-logger')
const reducers = require('../reducers')

module.exports = createStore(reducers, applyMiddleware(thunk, logger()))
