/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    application: ApplicationCard
  }
});;
