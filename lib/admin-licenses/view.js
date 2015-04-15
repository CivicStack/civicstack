/**
 * Module dependencies.
 */

var confirm = require('confirmation');
var render = require('render');
var Ractive = require('ractive');
var licenses = require('licenses');
var log = require('debug')('civicstack:admin-licenses');
var page = require('page');
var t = require('t');
var template = require('./template');
var request = require('request');

var LicensesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.observe('search', function (current, old) {
      function filter(license) {
        var name = license.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = licenses.items.filter(filter);
      this.set('licenses', filtered);
    })

    this.on('delete', function (ev, id, name) {
      ev.original.preventDefault();

      confirm(t('confirmation.title'), t('admin-licenses-form.confirmation.body', {name: name}))
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
          .del('/api/licenses/' + id)
          .end(function (err, res) {
            if (err || !res.ok) return log('Found error %o', err || res.error);

            licenses.fetch();
            page('/admin/licenses');
          });
      }
    })
  }
});

module.exports = LicensesList;
