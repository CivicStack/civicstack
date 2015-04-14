/**
 * Module dependencies.
 */

var config = require('config');
var filters = require('filters');
var Ractive = require('ractive');
var render = require('render');
var technologies = require('technologies');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('technologies', technologies.items);
    this.set('selected', filters.technologies);

    $('.modal').modal();

    this.on('search', function (ev) {
      filters.technologies = this.get('selected');
    });

    this.on('clear', function (ev) {
      filters.technologies = [];
    });

    var self = this;

    $('.modal').on('hidden.bs.modal', function (e) {
      $('.modal').remove();
      self.fire('close');
    })
  }
});
