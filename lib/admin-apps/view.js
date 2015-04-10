/**
 * Module dependencies.
 */

var config = require('config');
var render = require('render');
var Ractive = require('ractive');
var apps = require('applications').all;
var template = require('./template');

var TagsList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('config', config);

    this.observe('search', function (current, old) {
      function filter(app) {
        var name = app.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = apps.items.filter(filter);
      this.set('apps', filtered);
    })

    this.on('delete', function (ev, id) {
      ev.original.preventDefault();

      //todo: delete
    });
  }
});

module.exports = TagsList;
