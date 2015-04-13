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
  , technology: [ { type: ObjectId, ref: 'Technology' } ]
  , organization: { type: String }
  , github: { type: String }
  , website: { type: String }
  , twitter: { type: String }
  , license: { type: ObjectId, ref: 'License', required: false }
  , contact: { type: String }
  , partnership: { type: String }
  , comments: { type: String }
  , approved: { type: Boolean, required: true, default: false }
  , tags: [ { type: ObjectId, ref: 'Tag' } ]
  , category: { type: ObjectId, ref: 'Category', required: false }
  , country: { type: ObjectId, ref: 'Country', required: false }
  , uploadedBy: { type: ObjectId, ref: 'User', required: true }
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
 * Get `technology` ids
 * as array
 *
 * @return {Array} voters
 * @api public
 */

ApplicationSchema.virtual('technologyids').get(function() {
  if (!this.technology.length) return;
  return this.technology.map(function(technology) {
    return technology._id;
  });
});

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Application', ApplicationSchema);
