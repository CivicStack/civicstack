const React = require('react')
const { PropTypes } = React

const AppCard = ({
  href,
  name,
  backgroundColor,
  backgroundImageURL,
  countryName,
  description,
  twitterHandle,
  upvoteCount
}) => (
  <div className='application-container'>
    <article className='application-card'>
      <a className='app-logo'
        href={href}
        style={{ backgroundColor: backgroundColor, backgroundImage: `url(${backgroundImageURL})` }}>
        <h1>{name}</h1>
      </a>
      <section className='app-detail'>
        <header>
          <h1>
            <a href={href}>{name}</a>
          </h1>
          <h2>{countryName}</h2>
        </header>
        <p className='description'>{description}</p>
      </section>
      <footer>
        <div className='twitter pull-left'>
          <a href={`http://twitter.com/${twitterHandle}`} target='_blank'>{`@${twitterHandle}`}</a>
        </div>
        <div className='upvotes pull-right'>
          <a className='btn-upvote btn btn-sm btn-default'>
            <i className='fa fa-caret-up' />&nbsp;
            <span>{upvoteCount}</span>
          </a>
        </div>
      </footer>
    </article>
  </div>
)

AppCard.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImageURL: PropTypes.string,
  countryName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string,
  upvoteCount: PropTypes.number.isRequired
}

module.exports = AppCard
