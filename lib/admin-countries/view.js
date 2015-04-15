/**
 * Module dependencies.
 */

var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var countries = require('countries');
var template = require('./template');

var CountriesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());

    this.observe('search', function (current, old) {
      function filter(country) {
        var name = country.name[language()].toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = countries.items.filter(filter);
      this.set('countries', filtered);
    })
  }
});

module.exports = CountriesList;
