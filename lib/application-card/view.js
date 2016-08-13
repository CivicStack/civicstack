/**
 * Module dependencies.
 */

var language = require('language');
var Ractive = require('ractive');
var render = require('render');
var request = require('request');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());
    registerUpvoteEvents.apply(this);
  }
});

function registerUpvoteEvents () {
  function handleResponse (err, res) {
    if (!err && res.ok) {
      this.set('application.upvoted', res.body.upvoted);
      this.set('application.upvotesCount', res.body.upvotesCount);
    }
  }

  var self = this;
  var url = '/api/applications/' + this.data.application.id + '/upvote';

  this.on('upvote', function (ev) {
    if (self.data.user.logged()) {
      request.post(url).end(handleResponse.bind(this));
    } else {
      self.fire('signinrequired');
    }
  });

  this.on('undoUpvote', function (ev) {
    if (self.data.user.logged()) {
      request.del(url).end(handleResponse.bind(this));
    } else {
      self.fire('signinrequired');
    }
  });
}
