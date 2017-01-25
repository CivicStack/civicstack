const React = require('react')
const { PropTypes } = React

const Drawer = ({ onCloseClick }) => (
  <div id='sidebar'>
    <nav style={{ transform: 'translateZ(0)' }}>
      <div className='close fa fa-times' onClick={onCloseClick} />
      <div>
        <a href='/login'>
          <div className='fa fa-sign-in' />&nbsp;Entrar
        </a>
      </div>

      <div className='divider' />

      <div>
        <a href='/'>Home</a>
      </div>
      <div>
        <a href='/about'>Nosotros</a>
      </div>

      <div className='divider' />

      <div>
        <a href='#' title='Inglés' className='lang'>Inglés</a>
      </div>
      <div>
        <a href='#' title='Español' className='lang'>Español</a>
      </div>
      <div>
        <a href='#' title='Francés' className='lang'>Francés</a>
      </div>

      <div className='divider' />

      <div>
        <a href='https://github.com/DemocraciaEnRed/civicstack' target='_blank'>
          <div className='fa fa-github' />&nbsp;GitHub
        </a>
      </div>
    </nav>
  </div>
)

Drawer.propTypes = {
  onCloseClick: PropTypes.func
}

module.exports = Drawer
