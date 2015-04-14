/**
 * Module dependencies.
 */

var config = require('config');
var categories = require('categories');
var filters = require('filters');
var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());
    this.set('categories', categories.items);
    this.set('selected', filters.categories);

    $('.modal').modal();

    this.on('search', function (ev) {
      filters.categories = this.get('selected');
    });

    this.on('clear', function (ev) {
      filters.categories = [];
    });

    var self = this;

    $('.modal').on('hidden.bs.modal', function (e) {
      $('.modal').remove();
      self.fire('close');
    })
  }
});
