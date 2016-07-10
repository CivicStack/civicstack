/**
 * Module dependencies.
 */

var i18nSchema = require('./i18n-schema');
var log = require('debug')('civicstack:models:law');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var t = require('t-component');

/**
 * Application Vote Schema
 */

function max300Characters(val) {
  return val.length <= 300;
}

var descriptionSchema = i18nSchema;
Object.keys(descriptionSchema).forEach(function (key) {
  descriptionSchema[key].validate = { validator: max300Characters, msg: t('app.description.exceeded') };
});

var ApplicationSchema = new Schema({
    name: { type: String, required: true }
  , logo: { type: String }
  , backgroundColor: { type: String }
  , video: { type: String }
  , description: descriptionSchema
  , technology: [ { type: ObjectId, ref: 'Technology' } ]
  , organization: { type: String }
  , github: { type: String }
  , website: { type: String }
  , twitter: { type: String }
  , links: [ {
    url: { type: String, required: true }
  , description: { type: String }
} ]
  , license: { type: ObjectId, ref: 'License', required: false }
  , contact: { type: String, required: true }
  , partnership: { type: String }
  , comments: { type: String }
  , approved: { type: Boolean, required: true, default: false }
  , tags: [ { type: ObjectId, ref: 'Tag' } ]
  , country: { type: ObjectId, ref: 'Country', required: false }
  , uploadedBy: { type: ObjectId, ref: 'User', required: true }
  , upvotes: [ { type: ObjectId, ref: 'User' } ]
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
 * Get amount of `upvotes`
 *
 * @return {Number} amount of `upvotes`
 * @api public
 */

ApplicationSchema.virtual('upvotesCount').get(function() {
  return this.upvotes ? this.upvotes.length : 0;
});

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Application', ApplicationSchema);
