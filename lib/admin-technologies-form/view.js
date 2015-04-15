/**
 * Module dependencies.
 */

var Panel = require('panel');
var Ractive = require('ractive');
var request = require('request');
var render = require('render');
var t = require('t');
var technologies = require('technologies');
var template = require('./template');

var TechnologyForm = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    var self = this;

    this.on('save', function (ev) {
      var technology = this.get('technology');
      var url = '/api/technologies/' + (technology.id || 'create');
      request
        .post(url)
        .send(technology)
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
            body: t('admin.technologies.save.success'),
            el: self.find('.panels')
          });

          technologies.fetch();
        });

      return false;
    });
  }
});

module.exports = TechnologyForm;
