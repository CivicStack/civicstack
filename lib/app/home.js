const React = require('react')
const ReactDOM = require('react-dom')

const store = require('./store')
const actions = require('./actions')

const Header = require('./containers/Header')
const Footer = require('./components/Footer')

store.dispatch(actions.fetchApps())

ReactDOM.render(
  <div>
    <Header />
    <span>Helo worl</span>
    <Footer />
  </div>, document.getElementById('react-root'))
