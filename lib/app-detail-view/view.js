/**
 * Module dependencies.
 */

var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: ApplicationDetail
});

function ApplicationDetail() {
  var application = this.data.application;
  var tags = application.tags;
  var lang = language();

  function name(application) {
    return application.name[lang];
  }

  var tagnames = tags.map(name).join(', ');

  this.set('tagnames', tagnames);
  this.set('lang', lang);
}
