/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var applications = require('applications').approved;
var filters = require('filters');
var filter = filters.filter.bind(filters);
var countries = require('countries');
var tags = require('tags');
var technologies = require('technologies');
var FiltersCountry = require('filters-country');
var FiltersTechnology = require('filters-technology');
var FiltersTags = require('filters-tags');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var tags = require('tags');
var user = require('user');
var language = require('language')();

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
    this.set('lang', language);

    this.observe('filters.search', function (newValue) {
      var apps = this.get('applications');
      this.set('applications', applications.items.filter(filter));
    });

    this.on('filter', function (ev, by) {
      ev.original.preventDefault();

      var modal;
      if (by == 'country') {
        modal = new FiltersCountry({
          data: {
            selected: filters.countries
          }
        });
      } else if (by == 'technology') {
        modal = new FiltersTechnology({
          data: {
            selected: filters.technologies
          }
        });
      } else if (by == 'tags') {
        modal = new FiltersTags({
          data: {
            selected: filters.tags
          }
        });
      }

      modal.render('body');
      modal.on('close', function () {
        var filters = self.get('filters');
        self.set('applications', applications.items.filter(filter));

        self.set('selectedCountries', countries.items.filter(function (e) {
          return filters.countries.indexOf(e.id) >= 0;
        }));
        self.set('selectedTags', tags.items.filter(function (e) {
          return filters.tags.indexOf(e.id) >= 0;
        }));
        self.set('selectedTechnologies', technologies.items.filter(function (e) {
          return filters.technologies.indexOf(e.id) >= 0;
        }));
      })
    });
  }
});;
