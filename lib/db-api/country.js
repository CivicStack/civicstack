/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Country = mongoose.model('Country');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:tag');

/**
 * Get all countries
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'countries' list items found or `undefined`
 * @return {Module} `tag` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all countries.')

  Country
  .find()
  .select('id name')
  .exec(function (err, countries) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering countries %j', pluck(countries, 'id'));
    fn(null, countries);
  });

  return this;
};