/**
 * Module dependencies.
 */

var Panel = require('panel');
var Ractive = require('ractive');
var request = require('request');
var render = require('render');
var t = require('t');
var licenses = require('licenses');
var template = require('./template');

var LicenseForm = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    var self = this;

    this.on('save', function (ev) {
      var license = this.get('license');
      var url = '/api/licenses/' + (license.id || 'create');
      request
        .post(url)
        .send(license)
        .end(function (err, res) {
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
            body: t('admin.licenses.save.success'),
            el: self.find('.panels')
          });

          licenses.fetch();
        });

      return false;
    });
  }
});

module.exports = LicenseForm;
