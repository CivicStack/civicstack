/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var config = require('lib/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var log = require('debug')('civicstack:models:tag');

/**
 * Tag Schema
 */

var languages = config('languages');
var schemai18n = {};
languages.forEach(function (language) {
  schemai18n[language] = String;
});

var TagSchema = new Schema({
  name: schemai18n
});

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

TagSchema.set('toObject', { getters: true });
TagSchema.set('toJSON', { getters: true });

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Tag', TagSchema);
