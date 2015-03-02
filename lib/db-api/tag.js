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
  .findById(req.params.id)
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
