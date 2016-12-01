const React = require('react')
const { PropTypes } = React
const { connect } = require('react-redux')

const Header = require('../components/Header')
const Footer = require('../components/Footer')
const Drawer = require('../components/Drawer')
const AppList = require('../components/AppList')

const { filterApps } = require('../actions')

class App extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    apps: PropTypes.arrayOf(PropTypes.object),
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
    const { loading, apps } = this.props
    const { showDrawer } = this.state

    return (
      <div>
        <Header onHamburgerClick={this.toggleDrawer} />
        {loading ? null : <AppList apps={apps} onApplyPrefilter={this.applyFilter} />}
        <Footer />
        {showDrawer ? <Drawer onCloseClick={this.toggleDrawer} /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({ meta, apps }) => ({
  locale: meta.locale,
  loading: apps.fetching,
  apps: apps.items.map(app => ({
    ...app,
    description: app.description[meta.locale],
    country: {
      ...app.country,
      name: app.country.name[meta.locale]
    }
  }))
})

module.exports = connect(mapStateToProps)(App)
