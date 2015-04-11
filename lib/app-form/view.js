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
var template = require('./template');
var t = require('t');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    appdetail: Detail,
    colorpicker: ColorPicker
  },
  onrender: function () {
    this.set('lang', languge());
    this.set('countries', countries.items);
    this.set('categories', categories.items);
    this.set('licenses', licenses.items);
    this.set('step', 1);
    var app = {};
    app.backgroundColor = 'rgb(38, 38, 38)';
    app.description = {};
    this.set('app', app);

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
      this.set('step', step);
    });

    this.on('save', function (ev) {
      var app = this.get('app');
      app.tagids = [];

      function id(tag) {
        app.tagids.push(tag.id);
      }

      app.tags.map(id);

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
