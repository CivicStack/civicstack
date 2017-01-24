const React = require('react')
const { connect } = require('react-redux')
const { PropTypes, Component } = React

const AppCard = require('./app-card')
const FilterModal = require('./FilterModal')

const CountriesModal = ({ items, onCloseClick }) => (
  <FilterModal show title='Filtrar por país' onCloseClick={onCloseClick}>
    <div className='row'>
      {items.map(({ selected, id, name }) => (
        <div className='col-xs-12 col-sm-4'>
          <div className='checkbox'>
            <label>
              <input type='checkbox' value={id} />{name}
            </label>
          </div>
        </div>
      ))}
    </div>
  </FilterModal>
)

class AppList extends Component {

  static propTypes = {
    apps: PropTypes.arrayOf(PropTypes.object),
    onApplyPrefilter: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  state = {
    modals: {
      countries: false,
      technologies: false,
      tags: false
    }
  }

  applyPrefilter = filter => () => this.props.onApplyPrefilter(filter)

  render () {
    const { apps, countries } = this.props
    const { modals } = this.state

    return (
      <section className='homepage'>
        {modals.countries && <CountriesModal items={countries} onCloseClick={() => this.setState({ modals: { countries: false } })} />}
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
              <input className='form-control search' type='text' /><span className='search-icon fa fa-search' />
            </div>
            <div className='col-xs-12 col-sm-4'>
              <button className='btn btn-link' type='button' onClick={() => this.setState({
                modals: { countries: true } })}>País&nbsp;
                <span className='caret' />
              </button>
              <button className='btn btn-link' type='button'>Tecnología&nbsp;
                <span className='caret' />
              </button>
              <button className='btn btn-link' type='button'>Etiquetas&nbsp;
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
            {apps.map(({ id, logo, backgroundColor, name, country, description, twitter, upvotesCount }) => (
              <AppCard href={`/apps/${id}`}
                backgroundImageURL={logo}
                backgroundColor={backgroundColor}
                name={name}
                countryName={country.name}
                description={description}
                twitterHandle={twitter}
                upvoteCount={upvotesCount}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ meta }) => ({
  countries: meta.countries
})

module.exports = connect(mapStateToProps)(AppList)
