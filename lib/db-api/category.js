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

/**
 * Get Category form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Category's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'category' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id };

  log('Looking for category %s', id);
  Category
  .findOne(query)
  .exec(function (err, category) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!category) {
      log('Category %s not found', id);
      return fn(null);
    }
    log('Delivering category %s', category.id);
    fn(null, category);
  });
};

/**
 * Creates category
 *
 * @param {Object} data to create category
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'category' item created or `undefined`
 * @return {Module} `category` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new category %j', data);
  
  var category = new Category(data);
  category.save(onsave);

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved category %s', category.id);
    fn(null, category);
  }

  return this;
};

/**
 * Update given `category`
 *
 * @param {ObjectId|String} data to create category
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'category' item created or `undefined`
 * @return {Module} `category` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating category %s with %j', data.id, data);

  // get category
  exports.get(data.id, onget);

  function onget(err, category) {
    if (err) {
      log('Found error %s', err.message);
      return fn(err);
    };

    // update and save category document with data
    category.set(data);
    category.save(onupdate);
  }

  function onupdate(err, category) {
    if (err) return log('Found error %s', err), fn(err);
    
    log('Saved category %s', category.id)
    fn(null, category);
  }

  return this;
};
