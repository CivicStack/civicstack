const React = require('react')

module.exports = ({ match }) => (
  <div>
    <h1>Showing App { match.params.appId }</h1>
  </div>
)
