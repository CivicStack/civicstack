const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// Initialize database models
require('./models')(app)
const db = require('./db-api')

// Middlewares
const language = require('./middlewares/language')
const initialState = require('./middlewares/initial-state')

// Set template engine
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'templates'))

app.use(cookieParser())

// TODO: Refactor
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

app.get('/', language, initialState(db), (req, res) => {
  res.render('home', { initialState: JSON.stringify(req.store.getState()) })
})

app.listen(3000)
