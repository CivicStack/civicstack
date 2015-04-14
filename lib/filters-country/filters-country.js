/**
 * Module dependencies.
 */

var config = require('config');
var countries = require('countries');
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
    this.set('countries', countries.items);
    this.set('selected', filters.countries);

    $('.modal').modal();

    this.on('search', function (ev) {
      filters.countries = this.get('selected');
    });

    this.on('clear', function (ev) {
      filters.countries = [];
    });

    var self = this;

    $('.modal').on('hidden.bs.modal', function (e) {
      $('.modal').remove();
      self.fire('close');
    })
  }
});
