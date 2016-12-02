const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')

const createStore = require('./store')
const { fetchApps } = require('./actions')

const App = require('./containers/App')
const store = createStore(window.__INITIAL_STATE__)

store.dispatch(fetchApps())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('react-root'))
