/**
 * Module dependencies.
 */

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
  , description: { type: String, required: true, default: '' }
  , technology: { type: String }
  , organization: { type: String }
  , github: { type: String }
  , website: { type: String }
  , twitter: { type: String }
  , license: { type: String }
  , team: { type: String }
  , contact: { type: String }
  , workingAt: { type: String }
  , partnership: { type: String }
  , comments: { type: String }
  , approved: { type: Boolean, required: true, default: false }
  // , tags: { type: [Tag] }
  // , country: { type: Country }
});

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Application', ApplicationSchema);