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
var utils = require('../utils');
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

/**
 * Get License form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id License's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'license' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id };

  log('Looking for license %s', id);
  License
  .findOne(query)
  .exec(function (err, license) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!license) {
      log('License %s not found', id);
      return fn(null);
    }
    log('Delivering license %s', license.id);
    fn(null, license);
  });
};

/**
 * Creates license
 *
 * @param {Object} data to create license
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'license' item created or `undefined`
 * @return {Module} `license` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new license %j', data);

  var license = new License(data);
  license.save(onsave);

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved license %s', license.id);
    fn(null, license);
  }

  return this;
};

/**
 * Update given `license`
 *
 * @param {ObjectId|String} data to create license
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'license' item created or `undefined`
 * @return {Module} `license` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating license %s with %j', data.id, data);

  // get license
  exports.get(data.id, onget);

  function onget(err, license) {
    if (err) {
      log('Found error %s', err.message);
      return fn(err);
    };

    // update and save license document with data
    license.set(data);
    license.save(onupdate);
  }

  function onupdate(err, license) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved license %s', license.id)
    fn(null, license);
  }

  return this;
};

/**
 * Deletes license
 *
 * @param {Object} data to remove license
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'id' id removed or `undefined`
 * @return {Module} `license` module
 * @api public
 */

exports.remove = function remove(id, fn) {
  log('Deleting license %s', id);

  License
    .remove({_id: id})
    .exec(function (err) {
      if (err) return log('Found error %s', err), fn(err);

      log('Removed license %s', id);
      fn(null, id);
    });

  return this;
};
