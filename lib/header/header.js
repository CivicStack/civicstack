/**
 * Module dependencies.
 */

var language = require('language');
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
  onrender: function () {
    this.set('lang', language())
    this.on('lang', function (ev, lang) {
      ev.original.preventDefault();
      window.location = location.pathname + '?lang=' + lang;
    });
  }
});

user.on('ready', function () {
  header.set('user', user);
});
