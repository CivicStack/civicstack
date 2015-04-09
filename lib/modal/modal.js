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
    $('.modal').modal();

    var self = this;

    $('.modal').on('hidden.bs.modal', function (e) {
      $('.modal').remove();
      self.fire('close');
    })
  }
});
