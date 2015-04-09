/**
 * Module dependencies.
 */

var config = require('config');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('config', config);
  }
});
