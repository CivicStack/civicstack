/**
 * Module dependencies.
 */

var i18nSchema = require('./i18n-schema')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Country Schema
 */

var CountrySchema = new Schema({
  name: i18nSchema
});

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

CountrySchema.set('toObject', { getters: true });
CountrySchema.set('toJSON', { getters: true });

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Country', CountrySchema);
