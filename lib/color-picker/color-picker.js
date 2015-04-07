/**
 * Module dependencies.
 */

var ColorPicker = require('color-picker');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    var picker = new ColorPicker;
    var self = this;

    picker.el.replaceAll(this.find('.container'));

    picker.on('change', function(color){
      self.fire('colorchange', color.toString());
    });
  }
});
