/**
 * Module dependencies.
 */

var confirm = require('confirmation');
var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var countries = require('countries');
var log = require('debug')('civicstack:admin-countries');
var page = require('page');
var t = require('t');
var template = require('./template');
var request = require('request');

var CountriesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());

    this.observe('search', function (current, old) {
      function filter(country) {
        var name = country.name[language()].toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = countries.items.filter(filter);
      this.set('countries', filtered);
    })

    this.on('delete', function (ev, id, name) {
      ev.original.preventDefault();

      confirm(t('confirmation.title'), t('admin-countries-form.confirmation.body', {name: name}))
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
          .del('/api/countries/' + id)
          .end(function (err, res) {
            if (err || !res.ok) return log('Found error %o', err || res.error);

            countries.fetch();
            page('/admin/countries');
          });
      }
    })
  }
});

module.exports = CountriesList;
