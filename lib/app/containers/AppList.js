const debounce = require('lodash.debounce')
const React = require('react')
const { connect } = require('react-redux')

const { fetchApps, filterApps, searchApps } = require('../actions')

const AppCard = require('../components/AppList/AppCard')
const CountriesModal = require('../components/AppList/CountriesModal')
const TechnologiesModal = require('../components/AppList/TechnologiesModal')
const TagsModal = require('../components/AppList/TagsModal')

const { PropTypes, Component } = React

class AppList extends Component {
  static propTypes = {
    apps: PropTypes.arrayOf(PropTypes.object),
    onApplyPrefilter: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    searchPredicate: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.onKeyUp = debounce(this.onKeyUp, 500)

    this.state = {
      modals: {
        countries: false,
        technologies: false,
        tags: false
      },
      filters: {
        countries: [],
        technologies: [],
        tags: []
      },
      searchPredicate: props.searchPredicate
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchApps())
  }

  applyPrefilter = filter => () => this.props.onApplyPrefilter(filter)

  onCountriesFilter = items => {
    this.setState({
      filters: Object.assign(this.state.filters, {
        countries: items.filter(({ selected }) => selected).map(({ id }) => id)
      })
    }, () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onClearCountriesFilter = () => {
    this.setState({ filters: Object.assign(this.state.filters, { countries: [] }) },
      () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onTechnologiesFilter = items => {
    this.setState({
      filters: Object.assign(this.state.filters, {
        technologies: items.filter(({ selected }) => selected).map(({ id }) => id)
      })
    }, () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onClearTechnologiesFilter = () => {
    this.setState({ filters: Object.assign(this.state.filters, { technologies: [] }) },
      () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onTagsFilter = items => {
    this.setState({
      filters: Object.assign(this.state.filters, {
        tags: items.filter(({ selected }) => selected).map(({ id }) => id)
      })
    }, () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onClearTagsFilter = () => {
    this.setState({ filters: Object.assign(this.state.filters, { tags: [] }) },
      () => { this.props.dispatch(filterApps(this.state.filters)) })
  }

  onChange = ev => {
    this.setState({ searchPredicate: ev.target.value })
  }

  onKeyUp = ev => {
    this.props.dispatch(searchApps(this.state.searchPredicate))
  }

  render () {
    const { apps, countries, technologies, tags } = this.props
    const { modals } = this.state

    return (
      <section className='homepage'>
        <CountriesModal show={modals.countries} items={countries}
          onCloseClick={() => this.setState({ modals: { countries: false } })}
          onApplyFilterClick={this.onCountriesFilter}
          onClearFiltersClick={this.onClearCountriesFilter} />
        <TechnologiesModal show={modals.technologies} items={technologies}
          onCloseClick={() => this.setState({ modals: { technologies: false } })}
          onApplyFilterClick={this.onTechnologiesFilter}
          onClearFiltersClick={this.onClearTechnologiesFilter} />
        <TagsModal show={modals.tags} items={tags}
          onCloseClick={() => this.setState({ modals: { tags: false } })}
          onApplyFilterClick={this.onTagsFilter}
          onClearFiltersClick={this.onClearTagsFilter} />
        <div className='container'>

          <div className='prefilters text-center'>
            <h1 className='global-description'>Herramientas de <strong>código abierto</strong> para acciones políticas y sociales.</h1>
            <button className='btn btn-sm btn-default' type='button' onClick={this.applyPrefilter({
              tags: ['552f40333ec2bb03001dece1'],
              sort: 'upvotesCount',
              order: 'desc'
            })}>Comunicación más accesible</button>

            <button className='btn btn-sm btn-default' type='button' onClick={this.applyPrefilter({
              tags: ['552ef4c2f7692f03000022a2'],
              sort: 'upvotesCount',
              order: 'desc'
            })}>Transparentar presupuestos</button>

            <button className='btn btn-sm btn-default' type='button' onClick={this.applyPrefilter({
              tags: ['552f28bb3ec2bb03001deccd', '552ef3d1f7692f0300002291'],
              sort: 'upvotesCount',
              order: 'desc'
            })}>Difundir legislación</button>

            <button className='btn btn-sm btn-default' type='button' onClick={this.applyPrefilter({
              tags: [
                '552ef3b0f7692f030000228e',
                '552f29e23ec2bb03001deccf',
                '552ef383f7692f030000228d',
                '552f2a193ec2bb03001decd0'
              ],
              sort: 'upvotesCount',
              order: 'desc'
            })}>Promover la participación ciudadana</button>

            <button className='btn btn-sm btn-default' type='button' onClick={this.applyPrefilter({
              tags: [
                '552ef4d0f7692f03000022a3',
                '55367179719aa70300d04489',
                '552f29b63ec2bb03001decce',
                '552ef4f0f7692f03000022a4',
                '552ef328f7692f030000228b'
              ],
              sort: 'upvotesCount',
              order: 'desc'
            })}>Visualización de datos</button>
          </div>

          <div className='row homepage-navigation'>
            <div className='col-xs-12 col-sm-4'>
              <input
                className='form-control search'
                type='text'
                defaultValue=''
                value={this.state.searchPredicate}
                onKeyUp={this.onKeyUp}
                onChange={this.onChange}
              />
              <span className='search-icon fa fa-search' />
            </div>
            <div className='col-xs-12 col-sm-4'>
              <button className='btn btn-link' type='button' onClick={() => this.setState({
                modals: { countries: true } })}>País&nbsp;
                <span className='caret' />
              </button>
              <button className='btn btn-link' type='button' onClick={() => this.setState({
                modals: { technologies: true } })}>Tecnología&nbsp;
                <span className='caret' />
              </button>
              <button className='btn btn-link' type='button' onClick={() => this.setState({
                modals: { tags: true } })}>Etiquetas&nbsp;
                <span className='caret' />
              </button>
            </div>
            <div className='col-xs-12 col-sm-4 sort text-right'>
              <button className='btn btn-link sort-btn active' type='button'>Populares</button><button className='btn btn-link sort-btn' type='button'>Nuevas</button>
            </div>
          </div>
          <div className='row filters'>
            <div className='col-xs-12' />
          </div>
        </div>
        <div className='container applications-wrapper'>
          <div className='applications-container'>
            {apps.map((app) => (
              <AppCard
                href={`/apps/${app.id}`}
                key={app.id}
                backgroundImageURL={app.logo}
                backgroundColor={app.backgroundColor}
                name={app.name}
                countryName={app.country.name}
                description={app.description}
                twitterHandle={app.twitter}
                upvoteCount={app.upvotesCount}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ apps, meta }) => ({
  loading: apps.fetching,
  locale: meta.locale,
  apps: apps.items.map(app => ({
    ...app,
    description: app.description[meta.locale],
    country: {
      ...app.country,
      name: app.country.name[meta.locale]
    }
  })),
  countries: meta.countries.map(country => Object.assign({}, country, {
    selected: apps.filters.countries.includes(country.id)
  })),
  tags: meta.tags.map(tag => Object.assign({}, tag, {
    selected: apps.filters.tags.includes(tag.id)
  })),
  technologies: meta.technologies.map(technology => Object.assign({}, technology, {
    selected: apps.filters.technologies.includes(technology.id)
  })),
  searchPredicate: apps.searchPredicate
})

module.exports = connect(mapStateToProps)(AppList)
