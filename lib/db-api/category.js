/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:category');

/**
 * Get all categories
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'categories' list items found or `undefined`
 * @return {Module} `category` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all categories.')

  Category
  .find()
  .select('id name')
  .exec(function (err, categories) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering categories %j', pluck(categories, 'id'));
    fn(null, categories);
  });

  return this;
};