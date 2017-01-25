/**
 * Module dependencies.
 */

var i18nSchema = require('./i18n-schema')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Tag Schema
 */

var TagSchema = new Schema({
  name: i18nSchema
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
