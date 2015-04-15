/**
 * Module dependencies.
 */

var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var categories = require('categories');
var template = require('./template');

var CategoriesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());

    this.observe('search', function (current, old) {
      function filter(category) {
        var name = category.name[language()].toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = categories.items.filter(filter);
      this.set('categories', filtered);
    })
  }
});

module.exports = CategoriesList;
