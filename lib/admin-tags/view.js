/**
 * Module dependencies.
 */

var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var tags = require('tags');
var template = require('./template');

var TagsList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());

    this.observe('search', function (current, old) {
      function filter(tag) {
        var name = tag.name[language()].toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = tags.items.filter(filter);
      this.set('tags', filtered);
    })
  }
});

module.exports = TagsList;
