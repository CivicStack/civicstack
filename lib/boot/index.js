/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var favicon = require('serve-favicon');
var config = require('lib/config');
var translations = require('lib/translations');
var t = require('t-component');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t-component` component with parameter locale
 */

t.lang(config('locale'));

/**
 * Set `views` directory for module
 */

app.set('views', __dirname);

/**
 * Set `view engine` to `jade`.
 */

app.set('view engine', 'jade');

/**
 * middleware for favicon
 */

app.use(favicon(__dirname + '/images/favicon.ico'));

/**
 * Config application
 */

require('lib/setup')(app);

/**
 * Link models with
 * mongoDB database
 */

require('lib/models')(app);

/**
 * Load auth routes and
 * login strategies with
 * passport
 */

require('lib/auth')(app);

/**
 * Load user routes
 * API service
 */

app.use("/api", require('lib/user'));

/**
 * Load application
 * API Service
 */

app.use('/api', require('lib/application-api'));

/**
 * Load tag
 * API Service
 */

app.use('/api', require('lib/tag-api'));

/**
 * Load country
 * API Service
 */

app.use('/api', require('lib/country-api'));

/**
 * GET index page.
 */

app.get('*', function(req, res) {
  res.render('index', { config: config, t: t });
});
