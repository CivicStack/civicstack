/**
 * Module dependencies.
 */

var render = require('render');
var Ractive = require('ractive');
var licenses = require('licenses');
var template = require('./template');

var LicensesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.observe('search', function (current, old) {
      function filter(license) {
        var name = license.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = licenses.items.filter(filter);
      this.set('licenses', filtered);
    })
  }
});

module.exports = LicensesList;
