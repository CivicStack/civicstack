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
var utils = require('../utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:country');

/**
 * Get all countries
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'countries' list items found or `undefined`
 * @return {Module} `country` module
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

/**
 * Get Country form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Country's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'country' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id };

  log('Looking for country %s', id);
  Country
  .findOne(query)
  .exec(function (err, country) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!country) {
      log('Country %s not found', id);
      return fn(null);
    }
    log('Delivering country %s', country.id);
    fn(null, country);
  });
};

/**
 * Creates country
 *
 * @param {Object} data to create country
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'country' item created or `undefined`
 * @return {Module} `country` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new country %j', data);

  var country = new Country(data);
  country.save(onsave);

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved country %s', country.id);
    fn(null, country);
  }

  return this;
};

/**
 * Update given `country`
 *
 * @param {ObjectId|String} data to create country
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'country' item created or `undefined`
 * @return {Module} `country` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating country %s with %j', data.id, data);

  // get country
  exports.get(data.id, onget);

  function onget(err, country) {
    if (err) {
      log('Found error %s', err.message);
      return fn(err);
    };

    // update and save country document with data
    country.set(data);
    country.save(onupdate);
  }

  function onupdate(err, country) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved country %s', country.id)
    fn(null, country);
  }

  return this;
};

/**
 * Deletes country
 *
 * @param {Object} data to remove country
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'id' id removed or `undefined`
 * @return {Module} `country` module
 * @api public
 */

exports.remove = function remove(id, fn) {
  log('Deleting country %s', id);

  Country
    .remove({_id: id})
    .exec(function (err) {
      if (err) return log('Found error %s', err), fn(err);

      log('Removed country %s', id);
      fn(null, id);
    });

  return this;
};
