const React = require('react')
const { PropTypes } = React
const Modal = require('../Modal')

const FilterModal = ({ title, show, children, onClearFiltersClick, onSearchClick, onCloseClick }) => (
  <Modal show={show}>
    <div className='modal-header'>{title}
      <button type='button' data-dismiss='modal' aria-label='Close' className='close' onClick={onCloseClick}>
        <span aria-hidden='true'>×</span>
      </button>
    </div>

    <div className='modal-body'>{children}</div>

    <div className='modal-footer'>
      <button type='button' data-dismiss='modal' className='btn btn-warning' onClick={onClearFiltersClick}>
        Limpiar filtros
      </button>
      <button data-dismiss='modal' className='btn btn-default' onClick={onSearchClick}>
        <div className='fa fa-search' />Buscar
      </button>
    </div>
  </Modal>
)

FilterModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  children: PropTypes.element,
  onClearFiltersClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired
}

module.exports = FilterModal
