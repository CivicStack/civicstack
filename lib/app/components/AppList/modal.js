const React = require('react')
const { Component, PropTypes } = React

export default class Modal extends Component {

  render () {
    return (
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>Filtrar por país
            <button type='button' data-dismiss='modal' aria-label='Close' className='close'>
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-xs-12 col-sm-4'>
                <div className='checkbox'>
                  <label>
                    <input type='checkbox' value='552ef1d6f7692f0300002273' name='{{selected}}' />Alemania</label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' data-dismiss='modal' className='btn btn-warning'>Limpiar filtros</button>
            <button data-dismiss='modal' className='btn btn-default'>
              <div className='fa fa-search' /> Buscar</button>
          </div>
        </div>
      </div>
    )
  }
}
