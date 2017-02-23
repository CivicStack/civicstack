const React = require('react')

module.exports = ({ match }) => {
  debugger
  return (
    <div>
      <h1>Showing App { match.params.id }</h1>
    </div>
  )
}
