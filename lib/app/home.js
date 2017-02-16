const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const BrowserRouter = require('react-router/BrowserRouter').default

const createStore = require('./store')

const Layout = require('./containers/Layout')
const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>, document.getElementById('react-root'))
