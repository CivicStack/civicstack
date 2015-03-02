/**
 * Module dependencies.
 */

var config = require('config');
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

  function name(application) {
    return application.name[config.locale];
  }

  var tagnames = tags.map(name).join(', ');

  this.set('tagnames', tagnames);
  this.set('application.description', application.description[config.locale]);
}
