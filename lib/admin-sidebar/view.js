/**
 * Module dependencies.
 */

var classes = require('classes');
var render = require('render');
var Ractive = require('ractive');
var template = require('./template');

var AdminSidebar = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.observe('selected', function (current) {
      var items = this.findAll('a');
      var item = this.find('a[href="/admin/' + current + '"]');
      items.forEach(function (el) {
        classes(el).remove('selected');
      });
      if (item) classes(item).add('selected');
    })
  }
});

module.exports = AdminSidebar;
