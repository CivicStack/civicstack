const React = require('react')
const { Component, PropTypes } = React
const FilterModal = require('./FilterModal')

module.exports = class TagsModal extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      selected: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    show: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onApplyFilterClick: PropTypes.func,
    onClearFiltersClick: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      items: props.items
    }
  }

  render () {
    const { show, onCloseClick, onApplyFilterClick, onClearFiltersClick } = this.props
    const { items } = this.state
    return (
      <FilterModal show={show} title='Filtrar por etiquetas'
        onCloseClick={onCloseClick}
        onSearchClick={() => onApplyFilterClick(this.state.items)}
        onClearFiltersClick={onClearFiltersClick}>
        <div className='row'>
          {items.map(({ selected, id, name }) => (
            <div className='col-xs-12 col-sm-4'>
              <div className='checkbox'>
                <label>
                  <input type='checkbox' value={id} checked={selected} onChange={() => this.setState({
                    items: items.map(i => Object.assign({}, i, { selected: i.id === id ? !i.selected : i.selected }))
                  })} />&nbsp;{name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </FilterModal>
    )
  }
}
