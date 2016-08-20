/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var template = require('./template');
var sidebar = require('sidebar');

module.exports = new Ractive({
  isolated: true,
  template: render(template),
  el: '#site-header',
  openSidebar: sidebar.open.bind(sidebar)
});
