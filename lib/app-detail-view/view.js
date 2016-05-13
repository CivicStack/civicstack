/**
 * Module dependencies.
 */

var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var config = require('config')

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: ApplicationDetail,
  oncomplete: onComplete
});

function ApplicationDetail() {
  var application = this.data.application;
  var tags = application.tags;
  var lang = language();

  function name(application) {
    return application.name[lang];
  }

  function technologyname(technology) {
    return technology.name;
  }

  var tagnames = tags.map(name).join(', ');
  var technologynames = application.technology.map(technologyname).join(', ');

  this.set('tagnames', tagnames);
  this.set('technologynames', technologynames);
  this.set('lang', lang);
  this.set('host', config.host)
}

function onComplete() {
  // Reload Disqus widget. This enables to have a different discussion forum per page.
  DISQUS.reset({
    reload: true,
    config: function () {
      this.page.url = '{{ host + '/apps/' + id }}';
      this.page.identifier = '{{ id }}';
    }
  });
}
