/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var request = require('request');
var render = require('render');
var Stateful = require('stateful');
var log = require('debug')('civicstack:client-collection');

/**
 * Expose `Collection` proto constructor
 */

module.exports = Collection;

/**
 * Collection collection constructor
 */

function Collection(src) {
  if (!(this instanceof Collection)) {
    return new Collection(src);
  };

  this.src = src;

  // instance bindings
  this.middleware = this.middleware.bind(this);
  this.fetch = this.fetch.bind(this);

  this.state('initializing');
  this.fetch();
}

/**
 * Mixin Collection prototype with Emitter
 */

Stateful(Collection);

/**
 * Fetch `laws` from source
 *
 * @param {String} src
 * @api public
 */

Collection.prototype.fetch = function(src) {
  log('request in process');
  src = src || this.src;

  this.state('loading');

  request
  .get(src)
  .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load. Please try reloading the page. Thanks!';
      return this.error(message);
    };

    this.set(res.body);
  }
}

/**
 * Set items to `v`
 *
 * @param {Array} v
 * @return {Collection} Instance of `Collection`
 * @api public
 */

Collection.prototype.set = function(v) {
  this.items = v;
  this.state('loaded');
  return this;
}

/**
 * Get current `items`
 *
 * @return {Array} Current `items`
 * @api public
 */

Collection.prototype.get = function() {
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

Collection.prototype.middleware = function(ctx, next) {
  this.ready(next);
}

/**
 * Handle errors
 *
 * @param {String} error
 * @return {Collection} Instance of `Collection`
 * @api public
 */

Collection.prototype.error = function(message) {
  // TODO: We should use `Error`s instead of
  // `Strings` to handle errors...
  // Ref: http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
  this.state('error', message);
  log('error found: %s', message);

  // Unregister all `ready` listeners
  this.off('ready');
  return this;
}
