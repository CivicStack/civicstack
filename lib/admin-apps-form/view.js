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
var tags = require('tags');
var technologies = require('technologies');

var AdminAppForm = Ractive.extend({
  isolated: true,
  template: render(template),
  hastag: function (id) {
    console.log(id);
    return true;
  },
  validate: function validate() {
    var app = this.get('app');
    var errors = this.get('errors');
    var ok = true;

    function validateAttribute(attr) {
      if (!app[attr]) this.set('errors.' + attr, 'error'), ok = false;
    }

    validateAttribute = validateAttribute.bind(this);
    validateAttribute('name');
    validateAttribute('organization');
    validateAttribute('country');
    validateAttribute('website');
    validateAttribute('category');
    if (!app.description['en']) {
      this.set('errors.description.en', 'error')
      ok = false;
    } else if (app.description['en'].length > 300) {
      this.set('errors.description.en', 'error')
      ok = false;
    }

    if (!app.description['es']) {
      this.set('errors.description.es', 'error')
      ok = false;
    } else if (app.description['es'].length > 300) {
      this.set('errors.description.es', 'error')
      ok = false;
    }

    if (!app.description['fr']) {
      this.set('errors.description.fr', 'error')
      ok = false;
    } else if (app.description['fr'].length > 300) {
      this.set('errors.description.fr', 'error')
      ok = false;
    }
    
    return ok;
  },

  observeAppError: function (attr) {
    this.observe('app.' + attr, function (newValue) {
      if (newValue) this.set('errors.' + attr, '');
    })
  },

  onrender: function () {
    var app = this.get('app');
    var self = this;
    this.set('lang', language());
    this.set('tags', tags.items);
    this.set('countries', countries.items);
    this.set('categories', categories.items);
    this.set('licenses', licenses.items);
    this.set('technologies', technologies.items);

    this.observeAppError('name');
    this.observeAppError('organization');
    this.observeAppError('country');
    this.observeAppError('website');
    this.observeAppError('category');
    this.observeAppError('description.en');
    this.observeAppError('description.es');
    this.observeAppError('description.fr');

    this.on('save', function (ev) {
      if (!this.validate()) return false;
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
