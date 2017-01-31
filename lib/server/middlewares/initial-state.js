const store = require('../../app/store')

module.exports = db => (req, res, next) => {
  // TODO: All those db requests are cacheable
  Promise.all([
    db.country.all(),
    db.technology.all(),
    db.tag.all()
  ]).then(([countries, technologies, tags]) => {
    req.store = store({
      meta: {
        countries: countries.map(({ id, name }) => ({ id, name: name[req.lang] })),
        technologies: technologies.map(({ id, name }) => ({ id, name })),
        tags: tags.map(({ id, name }) => ({ id, name: name[req.lang] }))
      }
    })

    next()
  })
}
