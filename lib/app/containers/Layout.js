const React = require('react')
const Route = require('react-router/Route').default
const Switch = require('react-router/Switch').default

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')
const AppList = require('./AppList')
const AppShow = require('./AppShow')

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
        {/* <Route component={NotFound} /> */}
        {/* <Route pattern='/apps/:id' component={AppShow} /> */}
        <Route
          pattern='/'
          exact
          component={() => (
            <AppList />
          )} />
        <Footer />
        {showDrawer && <Drawer onCloseClick={this.toggleDrawer} />}
      </div>
    )
  }
}

function NotFound () {
  return <div>Not Found.</div>
}
