const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const Router = require('react-router-dom/BrowserRouter').default

const createStore = require('./store')

const Layout = require('./containers/Layout')
const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Layout />
    </Router>
  </Provider>, document.getElementById('react-root'))
