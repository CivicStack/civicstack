/**
 * Module dependencies.
 */

var config = require('config');
var tags = require('tags');
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
    this.set('tags', tags.items);
    this.set('selected', filters.tags);

    $('.modal').modal();

    this.on('search', function (ev) {
      filters.tags = this.get('selected');
    });

    this.on('clear', function (ev) {
      filters.tags = [];
    });

    var self = this;

    $('.modal').on('hidden.bs.modal', function (e) {
      $('.modal').remove();
      self.fire('close');
    })
  }
});
