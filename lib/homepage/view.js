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
var page = require('page');
var request = require('request');

/**
 * Expose Homepage
 */

function updateFilters () {
  function buildURL () {
    var url = '/api/applications/approved?'
    var countries = selectedCountries.length ? 'countries=' + selectedCountries.map(function(a) { return a.id; }).join(',') : undefined;
    var tags = selectedTags.length ? 'tags=' + selectedTags.map(function(a) { return a.id; }).join(',') : undefined;
    var technologies = selectedTechnologies.length ? 'technologies=' + selectedTechnologies.map(function(a) { return a.id; }).join(',') : undefined;
    url += [countries, tags, technologies].filter(function(b) { return b !== undefined; }).join('&');
    return url;
  }

  var self = this;
  var filters = this.get('filters');

  // Get current filters
  var selectedCountries = countries.items.filter(function (e) {
    return filters.countries.indexOf(e.id) >= 0;
  });
  var selectedTags = tags.items.filter(function (e) {
    return filters.tags.indexOf(e.id) >= 0;
  });
  var selectedTechnologies = technologies.items.filter(function (e) {
    return filters.technologies.indexOf(e.id) >= 0;
  });

  // Update filters UI
  this.set('selectedCountries', selectedCountries);
  this.set('selectedTags', selectedTags);
  this.set('selectedTechnologies', selectedTechnologies);

  // Fetch applications from API
  request
    .get(buildURL())
    .end(function (err, res) {
      // Update applications
      self.set('applications', res.body);
    });
}

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

    this.on('*.signinrequired', function (ev) {
      page('/login');
    });

    this.on('removeFilter', function (ev, type, id) {
      function remove (keypath, id) {
        var self = this;
        var index = this.get(keypath).indexOf(id);
        if (index >= 0) {
          this.splice(keypath, index, 1).then(function () {
            updateFilters.call(self);
            self.update();
          });
        }
      }

      switch (type) {
        case "country":
        remove.call(this, 'filters.countries', id);
        break;
        case "technology":
        remove.call(this, 'filters.technologies', id);
        break;
        case "tag":
        remove.call(this, 'filters.tags', id);
        break;
        default:
        throw new Error('error');
      }
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
      modal.on('close', updateFilters.bind(self));
    });
  }
});;
