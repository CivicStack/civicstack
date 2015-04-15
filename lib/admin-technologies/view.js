/**
 * Module dependencies.
 */

var confirm = require('confirmation');
var render = require('render');
var log = require('debug')('civicstack:admin-technologies');
var page = require('page');
var Ractive = require('ractive');
var technologies = require('technologies');
var t = require('t');
var template = require('./template');
var request = require('request');

var TechnologiesList = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    this.observe('search', function (current, old) {
      function filter(technology) {
        var name = technology.name.toLowerCase();
        current = current ? current.toLowerCase() : ''
        return current ? !!~name.indexOf(current) : true;
      }

      var filtered = technologies.items.filter(filter);
      this.set('technologies', filtered);
    })

    this.on('delete', function (ev, id, name) {
      ev.original.preventDefault();

      confirm(t('confirmation.title'), t('admin-technologies-form.confirmation.body', {name: name}))
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
          .del('/api/technologies/' + id)
          .end(function (err, res) {
            if (err || !res.ok) return log('Found error %o', err || res.error);

            technologies.fetch();
            page('/admin/technologies');
          });
      }
    })
  }
});

module.exports = TechnologiesList;
