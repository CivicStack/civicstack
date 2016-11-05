const React = require('react')
const { PropTypes } = React
const AppCard = require('./app-card')

class AppList extends React.Component {

  static propTypes = {
    apps: PropTypes.arrayOf(PropTypes.object)
  }

  render () {
    const { apps } = this.props

    return (
      <section className='homepage'>
        <div className='container'>
          <div className='prefilters text-center'>
            <h1 className='global-description'>Herramientas de <strong>código abierto</strong> para acciones políticas y sociales.</h1><button className='btn btn-sm btn-default' type='button'>Comunicación más accesible</button><button className='btn btn-sm btn-default' type='button'>Transparentar presupuestos</button><button className='btn btn-sm btn-default' type='button'>Difundir legislación</button><button className='btn btn-sm btn-default' type='button'>Promover la participación ciudadana</button><button className='btn btn-sm btn-default' type='button'>Visualización de datos</button>
          </div>
          <div className='row homepage-navigation'>
            <div className='col-xs-12 col-sm-4'>
              <input className='form-control search' type='text' /><span className='search-icon fa fa-search' />
            </div>
            <div className='col-xs-12 col-sm-4'>
              <button className='btn btn-link' type='button'>País&nbsp;
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

module.exports = AppList
