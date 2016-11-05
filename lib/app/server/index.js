const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './lib/app/server/templates')

const webpack = require('webpack')
const webpackConfig = require('../../../webpack.config.babel')
const compiler = webpack(webpackConfig)

app.use(express.static('./public'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))


app.get('/', (req, res) => {
  res.render('home', { algo: 4 })
})

app.listen(3000)
