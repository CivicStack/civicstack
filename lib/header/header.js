/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var template = require('./template');
var sidebar = require('sidebar');
var user = require('user');

module.exports = new Ractive({
  isolated: true,
  template: render(template),
  el: '#site-header',
  data: {
    user: user
  },
  openSidebar: sidebar.open.bind(sidebar)
});
