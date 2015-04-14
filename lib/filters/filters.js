/**
 * Module dependencies.
 */

var some = require('some');

function Filters(search, countries, technologies) {
  this.search = search || '';
  this.countries = countries || [];
  this.technologies = technologies || [];
}

Filters.prototype.filter = function(app) {
  var search = this.search ? this.search.toLowerCase() : '';
  var countries = this.countries;
  var technologies = this.technologies;
  var name = app.name.toLowerCase();

  var filterByCountry = filterByTechnology = true;
  var filterByName;

  filterByCountry = !countries.length || !!~countries.indexOf(app.country);
  filterByTechnology = !technologies.length || some(technologies, function (technology, i) {
    return !!~app.technology.indexOf(technology);
  });

  if (search == '') {
    filterByName = true;
  } else {
    filterByName = !!~name.indexOf(search);
  }

  return filterByName && filterByCountry && filterByTechnology;
};

module.exports = new Filters;