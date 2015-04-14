function Filters(search, countries) {
  this.search = search || '';
  this.countries = countries || [];
}

Filters.prototype.filter = function(app) {
  var search = this.search ? this.search.toLowerCase() : '';
  var countries = this.countries;
  var name = app.name.toLowerCase();

  var filterByCountry = true, filterByName;

  filterByCountry = !countries.length || !!~countries.indexOf(app.country);

  if (search == '') {
    filterByName = true;
  } else {
    filterByName = !!~name.indexOf(search);
  }

  return filterByName && filterByCountry;
};

module.exports = new Filters;