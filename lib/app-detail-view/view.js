/**
 * Module dependencies.
 */

var applications = require('applications').approved;
var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var config = require('config');
var request = require('request');
var page = require('page');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: ApplicationDetail,
  oncomplete: onComplete
});

function short (ghURL) {
  if (!ghURL) return '';
  var splitted = ghURL.split('/');
  return splitted[splitted.length - 2] + '/' + splitted[splitted.length - 1];
}

function ApplicationDetail () {
  var application = this.data.application;
  var showDisqus = this.data.disqus;
  var tags = application.tags;
  var lang = language();

  function name (application) {
    return application.name[lang];
  }

  function technologyname (technology) {
    return technology.name;
  }

  var tagnames = tags.map(name).join(', ');
  var technologynames = application.technology.map(technologyname).join(', ');

  this.set('tagnames', tagnames);
  this.set('technologynames', technologynames);
  this.set('lang', lang);
  this.set('host', config.host);
  this.set('showDisqus', showDisqus);
  this.set('facebook', this.data.application.facebook);
  this.set('twitter', this.data.application.twitter);
  this.set('github', this.data.application.github);
  this.set('githubShort', short(this.data.application.github));

  registerUpvoteEvents.apply(this);
}

function onComplete () {
  if (!this.data.application.id) return;

  this.on('*.signinrequired', function () {
    page('/login');
  });

  var self = this;
  this.set('linksLoading', true);
  request
    .get('/api/applications/' + this.data.application.id + '/links')
    .end(function (err, res) {
      self.set('linksLoading', false);
      if (!err && res.ok) self.set('application.links', res.body);
    });

  var getDisqusState = function () {
    var data = this.data;
    return function () {
      this.page.url = data.host + '/apps/' + data.application.id;
      this.page.identifier = data.application.id;
    };
  };

  // Reload Disqus widget. This enables to have a different discussion forum per page.
  if (window.DISQUS && window.DISQUS.reset) {
    window.DISQUS.reset({
      reload: true,
      config: getDisqusState.call(this)
    });
  }
}

function registerUpvoteEvents () {
  function handleResponse (err, res) {
    if (!err && res.ok) {
      this.set('application.upvoted', res.body.upvoted);
      this.set('application.upvotesCount', res.body.upvotesCount);
    }
  }

  var self = this;
  var url = '/api/applications/' + this.data.application.id + '/upvote';

  this.on('upvote', function () {
    if (self.data.user.logged()) {
      request.post(url).end(handleResponse.bind(this));
    } else {
      page('/login');
    }
  });

  this.on('undoUpvote', function () {
    if (self.data.user.logged()) {
      request.del(url).end(handleResponse.bind(this));
    } else {
      page('/login');
    }
  });

  this.on('back', function () {
    applications.fetch();
    page('/');
  });
}
