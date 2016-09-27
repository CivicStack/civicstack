var ApplicationCard = require('application-card');
var applications = require('applications');
var filters = require('filters');
var countries = require('countries');
var tags = require('tags');
var t = require('t');
var technologies = require('technologies');
var FiltersCountry = require('filters-country');
var FiltersTechnology = require('filters-technology');
var FiltersTags = require('filters-tags');
var Ractive = require('ractive');
var render = require('render');
var user = require('user');
var language = require('language');
var page = require('page');
var request = require('request');
var template = require('./template');
var prefilters = require('./prefilters');

var lang = language();
var filter = filters.filter.bind(filters);

/**
 * Expose Homepage
 */

module.exports = Ractive.extend({
  template: render(template),
  components: {
    application: ApplicationCard
  },
  data: {
    sorts: [
      {
        key: 'upvotesCount',
        order: 'desc',
        title: t('sort.by.popular'),
        active: true
      },
      {
        key: '_id',
        order: 'desc',
        title: t('sort.by.newest'),
        active: false
      }
    ],
    isSortActive: function (sortKey) {
      return this.get('sortBy') === sortKey ? 'active' : '';
    },
    prefilters: prefilters
  },
  onrender: function () {
    var self = this;

    // Initialisation
    this.set('user', user);
    this.set('filters', filters);
    this.set('lang', lang);
    this.set('filterUpdating', false);
    this.set('sortBy', 'upvotesCount');
    this.set('sortOrder', 'desc');
    updateFilters.call(this);

    // Event handlers registration
    this.observe('filters.search', function () {
      this.set('applications', applications.approved.items.filter(filter));
    });

    this.on('*.signinrequired', function () {
      page('/login');
    });

    // Sort links click handler
    this.on('sortBy', function (ev, by, order) {
      this.set('sortBy', by);
      this.set('sortOrder', order || 'asc');
      updateFilters.call(this);
    });

    // Filters X button click handler
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
        case 'country':
          remove.call(this, 'filters.countries', id);
          break;
        case 'technology':
          remove.call(this, 'filters.technologies', id);
          break;
        case 'tag':
          remove.call(this, 'filters.tags', id);
          break;
        default:
          throw new Error('error');
      }
    });

    // Search box keyup handler
    (function () {
      var timeoutId;
      var TIME = 1000;
      this.on('search', function (ev) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        var self = this;
        var value = ev.node.value;
        timeoutId = setTimeout(function () {
          self.set('filters.search', value);
          updateFilters.apply(self);
        }, TIME);
      });
    }).apply(this);

    // Filter click handler
    this.on('filter', function (ev, by) {
      ev.original.preventDefault();

      var modal;
      if (by === 'country') {
        modal = new FiltersCountry({
          data: {
            selected: filters.countries
          }
        });
      } else if (by === 'technology') {
        modal = new FiltersTechnology({
          data: {
            selected: filters.technologies
          }
        });
      } else if (by === 'tags') {
        modal = new FiltersTags({
          data: {
            selected: filters.tags
          }
        });
      }

      modal.render('body');
      modal.on('close', updateFilters.bind(self));
    });

    this.on('prefilter', function (ev, index) {
      [
        'tags',
        'technologies',
        'countries'
      ].forEach(function (type) {
        var prefilter = prefilters[index];
        this.set('filters.' + type, prefilter.filters.filter(function (item) {
          return item.type === type;
        }).map(function (item) {
          return item.id;
        }));
      }, this);
      updateFilters.call(this);
    });
  }
});

/**
 * Gathers applied filters and requests the backend for applications, then updates the model
 */

function updateFilters () {
  var self = this;
  var filters = this.get('filters');
  var sortBy = this.get('sortBy');
  var sortOrder = this.get('sortOrder');

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
  this.set('filterUpdating', true);

  request
    .get(buildURL())
    .end(function (err, res) {
      if (err) throw new Error();
      // Update applications
      self.set('applications', res.body);
      self.set('filterUpdating', false);
    });

  function buildURL () {
    var url = '/api/applications/approved?';
    var countries = selectedCountries.length ? 'countries=' + selectedCountries.map(function (a) {
      return a.id;
    }).join(',') : undefined;

    var tags = selectedTags.length ? 'tags=' + selectedTags.map(function (a) {
      return a.id;
    }).join(',') : undefined;

    var technologies = selectedTechnologies.length ? 'technologies=' + selectedTechnologies.map(function (a) {
      return a.id;
    }).join(',') : undefined;

    var sort = sortBy ? 'sort=' + sortBy : undefined;
    var order = sortOrder ? 'order=' + sortOrder : undefined;
    var search = filters.search ? 'q=' + filters.search : undefined;
    return url + compact([countries, tags, technologies, sort, order, search]).join('&');
  }
}

/**
 * Based on an array, returns other array filtering the `undefined` elements
 *
 * @param {Array} arr The list of elements to be filtered
 * @return {Array} An array with non undefined elements
 * @api public
 */

function compact (arr) {
  return arr.filter(function (el) {
    return el !== undefined;
  });
}
