/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Technology = mongoose.model('Technology');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:technology');

/**
 * Get all technologies
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'technologies' list items found or `undefined`
 * @return {Module} `technology` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all technologies.')

  Technology
  .find({ deletedAt: null })
  .select('id name')
  .exec(function (err, technologies) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering technologies %j', pluck(technologies, 'id'));
    fn(null, technologies);
  });

  return this;
};
