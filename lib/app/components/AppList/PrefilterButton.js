const React = require('react')
const { PropTypes, Component } = React

module.exports = class PrefilterButton extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    sort: PropTypes.string,
    order: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string
  }

  handleClick = ev => {
    const { tags, sort, order } = this.props
    this.props.onClick({ tags, sort, order })
  }

  render () {
    return (
      <button className='btn btn-sm btn-default' type='button' onClick={this.handleClick}>
        {this.props.text}
      </button>
    )
  }
}
