const React = require('react')
const { connect } = require('react-redux')

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDrawer: false
    }
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
        <Footer />
        {showDrawer ? <Drawer onCloseClick={this.toggleDrawer} /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

module.exports = connect(mapStateToProps)(App)
