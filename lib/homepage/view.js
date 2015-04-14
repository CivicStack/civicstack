/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var applications = require('applications').approved;
var filters = require('filters');
var filter = filters.filter.bind(filters);
var FiltersCountry = require('filters-country');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var user = require('user');

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    application: ApplicationCard
  },
  onrender: function () {
    var self = this;
    this.set('user', user);
    this.set('filters', filters);

    this.observe('filters.search', function (newValue) {
      var apps = this.get('applications');
      this.set('applications', applications.items.filter(filter));
    });

    this.on('filter', function (ev, by) {
      ev.original.preventDefault();

      if (by == 'country') {
        var modal = new FiltersCountry({
          data: {
            selected: filters.countries
          }
        });
      }

      modal.render('body');
      modal.on('close', function () {
        self.set('applications', applications.items.filter(filter));
      })
    });
  }
});;
