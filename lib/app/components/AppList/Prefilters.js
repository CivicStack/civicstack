const React = require('react')
const { PropTypes } = React

const Prefilters = ({ children }) => (
  <div className='prefilters text-center'>
    {children}
  </div>
)

Prefilters.propTypes = {
  children: PropTypes.element
}

module.exports = Prefilters
