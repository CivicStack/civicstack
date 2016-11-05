const React = require('react')

class Drawer extends React.Component {
  render () {
    return (
      <div id="sidebar">
        <nav>
          <div className="close fa fa-times" />
          <p>
            <a href="/login">
              <div className="fa fa-sign-in" />&nbsp;Entrar
            </a>
          </p>

          <div className="divider" />

          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/about">Nosotros</a>
          </p>

          <div className="divider" />

          <p>
            <a href="#" title="Inglés" className="lang">Inglés</a>
          </p>
          <p>
            <a href="#" title="Español" className="lang">Español</a>
          </p>
          <p>
            <a href="#" title="Francés" className="lang">Francés</a>
          </p>

          <div className="divider" />

          <p>
            <a href="https://github.com/DemocraciaEnRed/civicstack" target="_blank">
              <div className="fa fa-github" />&nbsp;GitHub
            </a>
          </p>
        </nav>
      </div>
    )
  }
}

module.exports = Drawer
