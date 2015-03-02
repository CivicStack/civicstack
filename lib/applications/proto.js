/**
 * Module dependencies.
 */

var config = require('config');
var Emitter = require('emitter');
var request = require('request');
var render = require('render');
var Stateful = require('stateful');
var log = require('debug')('civicstack:laws-proto');

/**
 * Expose `Applications` proto constructor
 */

module.exports = Applications;

/**
 * Applications collection constructor
 */

function Applications() {
  if (!(this instanceof Applications)) {
    return new Applications();
  };

  // instance bindings
  this.middleware = this.middleware.bind(this);
  this.fetch = this.fetch.bind(this);

  this.state('initializing');
  this.fetch();
}

/**
 * Mixin Applications prototype with Emitter
 */

Stateful(Applications);

/**
 * Fetch `laws` from source
 *
 * @param {String} src
 * @api public
 */

Applications.prototype.fetch = function(src) {
  log('request in process');
  src = src || '/api/applications';

  this.state('loading');

  request
  .get(src)
  .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load laws. Please try reloading the page. Thanks!';
      return this.error(message);
    };

    this.set(res.body);
  }
}

/**
 * Set items to `v`
 *
 * @param {Array} v
 * @return {Applications} Instance of `Applications`
 * @api public
 */

Applications.prototype.set = function(v) {
  this.items = v;

  function name(application) {
    return application.name[config.locale];
  }

  this.items.forEach(function (application) {
    application.tagnames = application.tags.map(name).join(', ');
    application.description = application.description[config.locale];
  })
  this.state('loaded');
  return this;
}

/**
 * Get current `items`
 *
 * @return {Array} Current `items`
 * @api public
 */

Applications.prototype.get = function() {
  return this.items;
}

/**
 * Middleware for `page.js` like
 * routers
 *
 * @param {Object} ctx
 * @param {Function} next
 * @api public
 */

Applications.prototype.middleware = function(ctx, next) {
  this.ready(next);
}

/**
 * Handle errors
 *
 * @param {String} error
 * @return {Applications} Instance of `Applications`
 * @api public
 */

Applications.prototype.error = function(message) {
  // TODO: We should use `Error`s instead of
  // `Strings` to handle errors...
  // Ref: http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
  this.state('error', message);
  log('error found: %s', message);

  // Unregister all `ready` listeners
  this.off('ready');
  return this;
}
