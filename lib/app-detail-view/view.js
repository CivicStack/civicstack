/**
 * Module dependencies.
 */

var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var config = require('config');
var request = require('request');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: ApplicationDetail,
  oncomplete: onComplete
});

function ApplicationDetail() {
  var self = this;
  var application = this.data.application;
  var showDisqus = this.data.disqus;
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
  this.set('host', config.host);
  this.set('showDisqus', showDisqus);
}

function onComplete() {
  if (!this.data.application.id) return;

  var self = this;
  this.set('linksLoading', true);
  request
    .get('/api/applications/' + this.data.application.id + '/links')
    .end(function(err, res) {
      self.set('linksLoading', false);
      if (!err && res.ok) {
        self.set('application.links', res.body);
      }
    });

  var getDisqusState = function () {
    var data = this.data;
    return function () {
      this.page.url = data.host + '/apps/' + data.application.id;
      this.page.identifier = data.application.id;
    }
  }

  // Reload Disqus widget. This enables to have a different discussion forum per page.
  if (DISQUS && DISQUS.reset) {
    DISQUS.reset({
      reload: true,
      config: getDisqusState.call(this)
    });
  }
}
