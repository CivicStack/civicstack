/**
 * Module dependencies.
 */

var config = require('config');
var render = require('render');
var Ractive = require('ractive');
var apps = require('applications');
var template = require('./template');

var TagsList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('config', config);

    this.observe('search', function (current, old) {
      function filter(app) {
        var title = app.title.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~title.indexOf(current) : true;
      }

      var filtered = apps.items.filter(filter);
      this.set('apps', filtered);
    })
  }
});

module.exports = TagsList;
