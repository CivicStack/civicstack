/**
 * Module dependencies.
 */

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
    colorpicker: ColorPicker
  },
  onrender: function () {
    this.set('step', 1);
    var app = {};
    app.backgroundColor = 'rgb(38, 38, 38)';
    this.set('app', app);

    this.on('colorpicker.colorchange', function (color) {
      this.set('app.backgroundColor', color);
      this.find('.background-color').style.backgroundColor = color;
    })

    this.on('goto', function ( event, step ) {
      
    });

  }
});
