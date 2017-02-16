const React = require('react')
const Match = require('react-router/Match').default
const Miss = require('react-router/Miss').default

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')
const AppList = require('./AppList')

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
        <Match
          pattern='/'
          exactly
          component={() => (
            <AppList />
          )} />
        <Miss render={NotFound} />
        <Footer />
        {showDrawer && <Drawer onCloseClick={this.toggleDrawer} />}
      </div>
    )
  }
}

function NotFound () {
  return <div>Not Found.</div>
}
