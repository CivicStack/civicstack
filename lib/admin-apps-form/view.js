/**
 * Module dependencies.
 */

var categories = require('categories');
var countries = require('countries');
var licenses = require('licenses');
var language = require('language');
var Panel = require('panel');
var Ractive = require('ractive');
var request = require('request');
var render = require('render');
var t = require('t');
var apps = require('applications').all;
var approved = require('applications').approved;
var template = require('./template');
var scroll = require('scroll');

var AdminAppForm = Ractive.extend({
  isolated: true,
  template: render(template),
  hastag: function (id) {
    console.log(id);
    return true;
  },
  onrender: function () {
    var app = this.get('app');
    var self = this;
    this.set('lang', language());
    this.set('countries', countries.items);
    this.set('categories', categories.items);
    this.set('licenses', licenses.items);

    this.on('save', function (ev) {
      var url = '/api/applications/' + (app.id || 'create');
      request
        .post(url)
        .send(app)
        .end(function (err, res) {
          scroll(document.body, 0, 500);
          if (err) {
            return new Panel({
              classes: 'panel-danger',
              heading: t('panel.heading.error'),
              body: t('panel.heading.body'),
              el: self.find('.panels')
            });
          }

          var panel = new Panel({
            classes: 'panel-success',
            heading: t('panel.heading.success'),
            body: t('admin.apps.save.success'),
            el: self.find('.panels')
          });

          apps.fetch();
          approved.fetch();
        });

      return false;
    });
  }
});

module.exports = AdminAppForm;
