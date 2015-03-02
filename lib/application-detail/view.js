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
  var tags = this.data.application.tags;

  function name(application) {
    return application.name[config.locale];
  }

  var tagnames = tags.map(name).join(', ');

  this.set('tagnames', tagnames);
}
