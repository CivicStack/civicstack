const store = require('../../app/store')

module.exports = function initialState (db) {
  return (req, res, next) => {
    let initialState = {
      meta: {
        countries: []
      }
    }

    db.country.all((err, countries) => {
      if (err) {
        return next(err)
      }

      initialState = Object.assign(initialState, {
        meta: Object.assign(initialState.meta, {
          countries: countries.map(({ name }) => ({
            id: name.en,
            name: name[req.lang]
          }))
        })
      })

      req.store = store(initialState)
      next()
    })
  }
}
