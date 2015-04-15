/**
 * Module dependencies.
 */

var language = require('language');
var lang = language();
var Collection = require('collection');

var tags = module.exports = new Collection('/api/tags');

tags.on('loaded', order.bind(tags));

function order() {
  this.items.sort(alphabetically);
}

function alphabetically(a, b) {
  if (a.name[lang] < b.name[lang]) return -1;
  if (a.name[lang] > b.name[lang]) return 1;
  return 0;
}
