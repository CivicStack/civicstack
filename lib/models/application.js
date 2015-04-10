/**
 * Module dependencies.
 */

var i18nSchema = require('./i18n-schema');
var log = require('debug')('civicstack:models:law');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Application Vote Schema
 */

var ApplicationSchema = new Schema({
    name: { type: String, required: true }
  , logo: { type: String,  type: String }
  , backgroundColor: { type: String }
  , description: i18nSchema
  , technology: { type: String }
  , organization: { type: String }
  , github: { type: String }
  , website: { type: String }
  , twitter: { type: String }
  , license: { type: String }
  , contact: { type: String }
  , partnership: { type: String }
  , comments: { type: String }
  , approved: { type: Boolean, required: true, default: false }
  , tags: [ { type: ObjectId, ref:'Tag' } ]
  // , country: { type: Country }
});

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

ApplicationSchema.set('toObject', { getters: true });
ApplicationSchema.set('toJSON', { getters: true });

/**
 * Get `tags` ids
 * as array
 *
 * @return {Array} voters
 * @api public
 */

ApplicationSchema.virtual('tagids').get(function() {
  if (!this.tags.length) return;
  return this.tags.map(function(tag) {
    return tag._id;
  });
});
/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Application', ApplicationSchema);
