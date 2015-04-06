/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var user = require('user');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    application: ApplicationCard
  },
  onrender: function () {
    this.set('user', user);
  }
});;
