/**
 * Module dependencies.
 */

var ApplicationCard = require('application-card');
var applications = require('applications').approved;
var filters = require('filters');
var filter = filters.filter.bind(filters);
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
    this.set('user', user);
    this.set('filters', filters);

    this.observe('filters.search', function (newValue) {
      var apps = this.get('applications');
      this.set('applications', applications.items.filter(filter));
    });
  }
});;
