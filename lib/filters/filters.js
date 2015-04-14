/**
 * Module dependencies.
 */

var some = require('some');

function Filters(search, countries, technologies, tags) {
  this.search = search || '';
  this.countries = countries || [];
  this.technologies = technologies || [];
  this.tags = tags || [];
}

Filters.prototype.filter = function(app) {
  var search = this.search ? this.search.toLowerCase() : '';
  var countries = this.countries;
  var technologies = this.technologies;
  var tags = this.tags;
  var name = app.name.toLowerCase();

  var filterByCountry = filterByTechnology = filterByTags = true;
  var filterByName;

  filterByCountry = !countries.length || !!~countries.indexOf(app.country);
  filterByTechnology = !technologies.length || some(technologies, function (technology, i) {
    return !!~app.technology.indexOf(technology);
  });
  filterByTags = !tags.length || some(tags, function (tag, i) {
    return !!~app.tags.indexOf(tag);
  });

  if (search == '') {
    filterByName = true;
  } else {
    filterByName = !!~name.indexOf(search);
  }

  return filterByName && filterByCountry && filterByTechnology && filterByTags;
};

module.exports = new Filters;