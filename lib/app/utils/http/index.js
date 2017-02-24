const fetch = require('isomorphic-fetch')

const params = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'cookie': document.cookie
  },
  credentials: 'include'
}

module.exports.get = path => fetch(path, params)

module.exports.post = path => fetch(path, {
  ...params,
  method: 'POST'
})
