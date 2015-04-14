/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var applications = require('applications').approved;
var categories = require('categories');
var filters = require('filters');
var filter = filters.filter.bind(filters);
var FiltersCategory = require('filters-category');
var FiltersCountry = require('filters-country');
var FiltersTechnology = require('filters-technology');
var FiltersTags = require('filters-tags');
var Ractive = require('ractive');
var render = require('render');
var template = require('./template');
var tags = require('tags');
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
      } else if (by == 'category') {
        modal = new FiltersCategory({
          data: {
            selected: filters.categories
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
