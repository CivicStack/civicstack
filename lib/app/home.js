const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')

const store = require('./store')
const actions = require('./actions')

const App = require('./containers/App')

store.dispatch(actions.fetchApps())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('react-root'))
