const React = require('react')
const { PropTypes } = React
const Match = require('react-router/Match').default
const Miss = require('react-router/Miss').default

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')
const AppList = require('../components/AppList')

const { filterApps } = require('../actions')

module.exports = class Layout extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

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

  applyFilter = filter => {
    this.props.dispatch(filterApps(filter))
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
            <AppList onApplyPrefilter={this.applyFilter} />
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
