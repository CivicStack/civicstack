const React = require('react')
const Route = require('react-router/Route').default

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')
const AppList = require('./AppList')
const AppView = require('./AppView')

module.exports = class Layout extends React.Component {
  state = {
    showDrawer: false
  }

  toggleDrawer = () => {
    this.setState({
      showDrawer: !this.state.showDrawer
    })
  }

  render () {
    const { showDrawer } = this.state

    return (
      <div>
        <Header onHamburgerClick={this.toggleDrawer} />
        <Route
          pattern='/'
          exact
          component={() => (
            <AppList />
          )} />
        <Route exact pattern='/apps/:id' component={AppView} />
        <Route render={NotFound} />
        <Footer />
        {showDrawer && <Drawer onCloseClick={this.toggleDrawer} />}
      </div>
    )
  }
}

function NotFound () {
  return <div>Not Found.</div>
}
