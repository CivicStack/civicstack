/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var template = require('./template');

var AdminView = Ractive.extend({
  isolated: true,
  template: render(template),
});

module.exports = AdminView;
