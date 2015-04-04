/**
 * Module dependencies.
 */

var config = require('config');
var Panel = require('panel');
var Ractive = require('ractive');
var request = require('request');
var render = require('render');
var t = require('t');
var tags = require('tags');
var template = require('./template');

var TagForm = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    var self = this;
  	this.set('config', config);

    this.on('save', function (ev) {
      var tag = this.get('tag');
      var url = '/api/tags/' + tag.id;
      request
        .post(url)
        .send(tag)
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
            body: t('admin.tags.save.success'),
            el: self.find('.panels')
          });

          tags.fetch();
        });

      return false;
    });
  }
});

module.exports = TagForm;
