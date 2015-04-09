/**
 * Module dependencies.
 */

var Collection = require('collection');

module.exports.all = new Collection('/api/applications');

module.exports.approved = new Collection('/api/applications/approved');
