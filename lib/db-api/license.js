/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var License = mongoose.model('License');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:license');

/**
 * Get all licenses
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'licenses' list items found or `undefined`
 * @return {Module} `license` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all licenses.')

  License
  .find()
  .select('id name')
  .exec(function (err, licenses) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering licenses %j', pluck(licenses, 'id'));
    fn(null, licenses);
  });

  return this;
};