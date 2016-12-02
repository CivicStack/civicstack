const React = require('react')
const { PropTypes } = React
const { connect } = require('react-redux')
const Match = require('react-router/Match').default
const Miss = require('react-router/Miss').default

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
        {loading && (
          <Match
            pattern='/'
            exactly
            component={() => (
              <AppList apps={apps} onApplyPrefilter={this.applyFilter} />
            )} />
        )}
        <Miss render={() => <div>Not Found.</div>} />
        <Footer />
        {showDrawer && <Drawer onCloseClick={this.toggleDrawer} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { apps, meta } = state
  return ({
    locale: meta.locale,
    countries: meta.countries,
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
}

module.exports = connect(mapStateToProps)(App)
