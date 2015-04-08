/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var template = require('./template');
var user = require('user');

var header = new Ractive({
  isolated: true,
  template: render(template),
  el: '#site-header',
  data: {
    user: user
  },
});

user.on('ready', function () {
  header.set('user', user);
});
