/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Application = mongoose.model('Application');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:application');

/**
 * Get all applications
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'applications' list items found or `undefined`
 * @return {Module} `application` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all applications.')

  Application
  .find({ deletedAt: null })
  .select('id name logo backgroundColor description technology organization github website twitter license team contact workingAt partnership comments approved')
  .exec(function (err, applications) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering applications %j', pluck(applications, 'id'));
    fn(null, applications);
  });

  return this;
};
