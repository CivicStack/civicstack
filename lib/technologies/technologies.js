/**
 * Module dependencies.
 */

var Collection = require('collection');

var technologies = module.exports = new Collection('/api/technologies');

technologies.on('loaded', order.bind(technologies));

function order() {
  this.items.sort(alphabetically);
}

function alphabetically(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
