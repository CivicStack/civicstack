/**
 * Module dependencies.
 */

var confirm = require('confirmation');
var log = require('debug')('civicstack:admin-apps');
var render = require('render');
var Ractive = require('ractive');
var apps = require('applications').all;
var approved = require('applications').approved;
var template = require('./template');
var page = require('page');
var t = require('t');
var request = require('request');

var TagsList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {

    this.observe('search', function (current, old) {
      function filter(app) {
        var name = app.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = apps.items.filter(filter);
      this.set('apps', filtered);
    })

    this.on('delete', function (ev, id, name) {
      ev.original.preventDefault();

      confirm(t('confirmation.title'), t('admin-apps-form.confirmation.body', {name: name}))
        .cancel(t('confirmation.cancel'))
        .ok(t('confirmation.ok'))
        .modal()
        .closable()
        .effect('slide')
        .focus()
        .show(onconfirmdelete.bind(this));

      function onconfirmdelete(ok) {
        if (!ok) return;

        request
          .del('/api/applications/' + id)
          .end(function (err, res) {
            if (err || !res.ok) return log('Found error %o', err || res.error);

            apps.fetch();
            approved.fetch();
            page('/admin/apps');
          });
      }
    });
  }
});

module.exports = TagsList;
