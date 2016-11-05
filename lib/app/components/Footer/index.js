const React = require('react')
const { footer, container } = require('./styles')

class Footer extends React.Component {
  render () {
    return (
      <footer id="site-footer">
        <div {...footer} {...container}>
        Realizado por <a href="http://democraciaenred.org/" target="_blank">Democracia en Red</a> y <a href="http://www.asuntosdelsur.org/" target="_blank">Asuntos del Sur</a>
        </div>
      </footer>
    )
  }
}

module.exports = Footer
