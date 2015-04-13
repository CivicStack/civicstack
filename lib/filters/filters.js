function Filters(search) {
  this.search = search || '';
}

Filters.prototype.filter = function(app) {
  var search = this.search ? this.search.toLowerCase() : '';
  var name = app.name.toLowerCase();
  return search ? !!~name.indexOf(search) : true;
};

module.exports = new Filters;