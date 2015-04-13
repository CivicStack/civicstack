/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Technology Schema
 */

var TechnologySchema = new Schema({
  name: { type: String, required: true }
});

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

TechnologySchema.set('toObject', { getters: true });
TechnologySchema.set('toJSON', { getters: true });

/**
 * Expose Mongoose model loaded
 */

module.exports = mongoose.model('Technology', TechnologySchema);
