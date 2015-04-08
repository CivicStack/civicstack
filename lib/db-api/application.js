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
  .select('id title logo backgroundColor description technology tags organization github website twitter license team contact workingAt partnership comments approved')
  .populate('tags')
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

/**
 * Get Application form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Application's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'application' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id, deletedAt: null };

  log('Looking for application %s', id);
  Application
  .findOne(query)
  .populate('tags')
  .exec(function (err, application) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!application) {
      log('Application %s not found', id);
      return fn(null);
    }
    log('Delivering application %s', application.id);
    fn(null, application);
  });
};
