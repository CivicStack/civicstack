/**
 * Module dependencies.
 */

var Detail = require('app-detail-view');
var categories = require('categories');
var language = require('language');
var classes = require('classes');
var ColorPicker = require('color-picker');
var countries = require('countries');
var licenses = require('licenses');
var Modal = require('modal');
var page = require('page');
var Ractive = require('ractive');
var render = require('render');
var request = require('request');
var t = require('t');
var tags = require('tags');
var technologies = require('technologies');
var template = require('./template');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    appdetail: Detail,
    colorpicker: ColorPicker
  },
  validate: function validate(step) {
    var app = this.get('app');
    var errors = this.get('errors');
    var ok = true;

    function validateAttribute(attr) {
      if (!app[attr]) this.set('errors.' + attr, 'error'), ok = false;
    }

    validateAttribute = validateAttribute.bind(this);

    if ((step - 1) == 1) {
      validateAttribute('name');
    } else if ((step - 1) == 2) {
      validateAttribute('organization');
      validateAttribute('country');
      validateAttribute('website');
      validateAttribute('category');
      if (!app.description[language()]) this.set('errors.description', 'error'), ok = false;
    }
    return ok;
  },

  observeAppError: function (attr) {
    this.observe('app.' + attr, function (newValue) {
      if (newValue) this.set('errors.' + attr, '');
    })
  },
  onrender: function () {
    this.set('lang', language());
    this.set('countries', countries.items);
    this.set('categories', categories.items);
    this.set('licenses', licenses.items);
    this.set('tags', tags.items);
    this.set('technologies', technologies.items);
    this.set('step', 1);
    var app = {};
    app.backgroundColor = 'rgb(38, 38, 38)';
    app.description = {};
    this.set('app', app);
    this.set('errors', {});

    this.observe('step', function (newValue, oldValue) {
      var oldStep = this.find('.header-step-' + oldValue);
      var newStep = this.find('.header-step-' + newValue);

      if (oldStep) classes(oldStep).add('disabled').add('hidden-sm').add('hidden-xs');
      if (newStep) classes(newStep).remove('disabled').remove('hidden-sm').remove('hidden-xs');
    });

    this.on('colorpicker.colorchange', function (color) {
      this.set('app.backgroundColor', color);
      this.find('.background-color').style.backgroundColor = color;
    })

    this.on('goto', function ( event, step ) {
      if (this.validate(step)) {
        this.set('step', step);
      }
    });

    this.observeAppError('name');
    this.observeAppError('organization');
    this.observeAppError('country');
    this.observeAppError('website');
    this.observeAppError('description');
    this.observeAppError('category');

    this.on('save', function (ev) {
      var app = this.get('app');
      app.tagids = [];
      app.technologyids = [];

      function tagid(tag) {
        app.tagids.push(tag.id);
      }

      function technologyid(technology) {
        app.technologyids.push(technology.id);
      }

      app.tags.map(tagid);
      app.technology.map(technologyid);

      request
        .post('/api/applications/create')
        .send(app)
        .end(function (err, res) {
          if (err) {

          }

          var modal = new Modal({
            data: {
              title: t('app-form.modal.title'),
              body: t('app-form.modal.body')
            }
          })
          modal.render('body');
          modal.on('close', function () {
            page.redirect('/');
          })
        })
    })
  }
});
