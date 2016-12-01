const express = require('express')
const app = express()
require('./models')(app)

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

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000)
