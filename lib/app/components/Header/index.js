const React = require('react')
const { PropTypes } = React
const { style } = require('glamor')

const siteHeader = style({
  height: '80px',
  borderBottom: '2px',
  backgroundColor: '#fafafa',
  ':after': {
    content: '',
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundPosition: 'center center',
    backgroundImage: 'repeating-linear-gradient(to right, #f7c64d 0px, #f7c64d 120px, #61baa8 120px, #61baa8 240px, #1394af 240px, #1394af 360px, #d93f5d 360px, #d93f5d 480px, #714c80 480px, #714c80 600px, #e16b55 600px, #e16b55 720px)'
  }
})

const Header = ({ onHamburgerClick }) => (
  <header id='site-header' className='navbar navbar-fixed-top' {...siteHeader}>
    <div className='container'>
      <a href='/' className='navbar-brand'>
        <img src='/lib/header/images/logo.svg' title='Civic Stack' />
        <span>Civic Stack</span>
      </a>
      <div className='menu'>
        <a href='/login' className='add-app btn btn-primary'>
          <div className='fa fa-plus-circle' />&nbsp;Subir aplicación
        </a>
        <button type='button' className='toggle-sidebar' onClick={onHamburgerClick}>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  onHamburgerClick: PropTypes.func
}

module.exports = Header
