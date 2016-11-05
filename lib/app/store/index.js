const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const reducers = require('../reducers')

module.exports = createStore(reducers, applyMiddleware(thunk))
