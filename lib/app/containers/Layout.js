const React = require('react')
const { PropTypes } = require('react')
const { Route, Switch } = require('react-router-dom')
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
        <Switch>
          <Route
            pattern='/'
            render={() => (
              <AppList onApplyPrefilter={this.applyFilter} />
            )} />
          <Route pattern='/apps/:id' component={AppShow} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
        {showDrawer && <Drawer onCloseClick={this.toggleDrawer} />}
      </div>
    )
  }
}

function NotFound () {
  return <div>Not Found.</div>
}
