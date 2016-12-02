const express = require('express')
const app = express()
require('./models')(app)
const db = require('./db-api')
const store = require('../app/store')

app.set('view engine', 'pug')
app.set('views', './lib/server/templates')

const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.babel')
const compiler = webpack(webpackConfig)

app.use(express.static('./public'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use('/api', require('./api/apps'))

const storeMw = (req, res, next) => {
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
          es: name.es,
          en: name.en,
          fr: name.fr
        }))
      })
    })

    req.store = store(initialState)
    next()
  })
}

app.get('/', storeMw, (req, res) => {
  res.render('home', { initialState: JSON.stringify(req.store.getState()) })
})

app.listen(3000)
