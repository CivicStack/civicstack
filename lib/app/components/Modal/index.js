const React = require('react')
const { Component, PropTypes } = React

class Modal extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    show: PropTypes.bool
  }

  render () {
    const { children, show } = this.props
    return (
      <div tabIndex='-1' role='dialog' className='modal fade in' style={{ display: show ? 'block' : 'none', paddingLeft: '0px' }}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Modal
