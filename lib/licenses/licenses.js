/**
 * Module dependencies.
 */

var Collection = require('collection');

var licenses = module.exports = new Collection('/api/licenses');

licenses.on('loaded', order.bind(licenses));

function order() {
  this.items.sort(alphabetically);
}

function alphabetically(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
