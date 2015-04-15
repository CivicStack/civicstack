/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var technologies = require('technologies');
var template = require('./template');

var TechnologiesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.observe('search', function (current, old) {
      function filter(technology) {
        var name = technology.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = technologies.items.filter(filter);
      this.set('technologies', filtered);
    })
  }
});

module.exports = TechnologiesList;
