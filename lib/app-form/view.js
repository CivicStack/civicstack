/**
 * Module dependencies.
 */

var Detail = require('app-detail-view');
var config = require('config');
var classes = require('classes');
var ColorPicker = require('color-picker');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    appdetail: Detail,
    colorpicker: ColorPicker
  },
  onrender: function () {
    this.set('config', config);
    this.set('step', 1);
    var app = {};
    app.backgroundColor = 'rgb(38, 38, 38)';
    this.set('app', app);

    this.observe('step', function (newValue, oldValue) {
      var oldStep = this.find('.header-step-' + oldValue);
      var newStep = this.find('.header-step-' + newValue);

      if (oldStep) classes(oldStep).add('disabled').add('hidden-sm').add('hidden-xs');
      if (newStep) classes(newStep).remove('disabled').remove('hidden-sm').remove('hidden-xs');
    });

    this.on('colorpicker.colorchange', function (color) {
      this.set('app.backgroundColor', color);
      this.find('.background-color').style.backgroundColor = color;
    })

    this.on('goto', function ( event, step ) {
      this.set('step', step);
    });

  }
});
