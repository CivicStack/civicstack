/**
 * Module dependencies.
 */

var confirm = require('confirmation');
var language = require('language');
var log = require('debug')('civicstack:admin-categories');
var render = require('render');
var Ractive = require('ractive');
var categories = require('categories');
var page = require('page');
var t = require('t');
var template = require('./template');
var request = require('request');

var CategoriesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.set('lang', language());

    this.observe('search', function (current, old) {
      function filter(category) {
        var name = category.name[language()].toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = categories.items.filter(filter);
      this.set('categories', filtered);
    })

    this.on('delete', function (ev, id, name) {
      ev.original.preventDefault();

      confirm(t('confirmation.title'), t('admin-categories-form.confirmation.body', {name: name}))
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
          .del('/api/categories/' + id)
          .end(function (err, res) {
            if (err || !res.ok) return log('Found error %o', err || res.error);

            categories.fetch();
            page('/admin/categories');
          });
      }
    })
  }
});

module.exports = CategoriesList;
