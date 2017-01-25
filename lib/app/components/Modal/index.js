const React = require('react')
const { Component, PropTypes } = React
const { css } = require('glamor')

class Modal extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    show: PropTypes.bool
  }

  render () {
    const { children, show } = this.props
    return (
      <div tabIndex='-1' role='dialog' className='modal fade in' style={{ display: show ? 'block' : 'none', paddingLeft: '0px' }} {...style}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

const style = css`
  overflow: scroll;
`

module.exports = Modal
