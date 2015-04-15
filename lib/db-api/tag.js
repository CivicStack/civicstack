/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');
var utils = require('lib/utils');
var pluck = utils.pluck;
var log = require('debug')('civicstack:db-api:tag');

/**
 * Get all tags
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'tags' list items found or `undefined`
 * @return {Module} `tag` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all tags.')

  Tag
  .find({ deletedAt: null })
  .select('id name')
  .exec(function (err, tags) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering tags %j', pluck(tags, 'id'));
    fn(null, tags);
  });

  return this;
};

/**
 * Get Tag form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Tag's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'tag' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  log('Looking for tag %s', id);
  Tag
  .findById(id)
  .exec(function (err, tag) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!tag) {
      log('Tag %s not found', id);
      return fn(null);
    }
    log('Delivering tag %s', tag.id);
    fn(null, tag);
  });
};

/**
 * Creates tag
 *
 * @param {Object} data to create tag
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'tag' item created or `undefined`
 * @return {Module} `tag` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new tag %j', data);
  
  var tag = new Tag(data);
  tag.save(onsave);

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved tag %s', tag.id);
    fn(null, tag);
  }

  return this;
};

/**
 * Update tag
 *
 * @param {ObjectId|String} data to create tag
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'tag' item created or `undefined`
 * @return {Module} `tag` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating tag %s with %j', data.id, data);

  exports.get(data.id, onget);

  function onget(err, tag) {
    if (err) {
      log('Found error %s', err.message);
      return fn(err);
    };

    // update and save tag document with data
    tag.set(data);
    tag.save(onupdate);
  }

  function onupdate(err, tag) {
    if (!err) return log('Saved tag %s', tag.id), fn(null, tag);
    return log('Found error %s', err), fn(err);
  }

  return this;
};