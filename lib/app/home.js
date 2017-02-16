const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const BrowserRouter = require('react-router/BrowserRouter').default

const createStore = require('./store')

const App = require('./containers/App')
const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('react-root'))
