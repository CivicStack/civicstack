/**
 * Module dependencies.
 */

var i18nSchema = require('./i18n-schema')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Category Schema
 */

var CategorySchema = new Schema({
  name: i18nSchema
});

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

CategorySchema.set('toObject', { getters: true });
CategorySchema.set('toJSON', { getters: true });

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Category', CategorySchema);
