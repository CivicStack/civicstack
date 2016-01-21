/**
 * Module dependencies.
 */

var en = require('./lib/en');
var es = require('./lib/es');
var fr = require('./lib/fr');

module.exports.help = function(t) {
  // English
  t.en = en;

  // Spanish
  t.es = es;

  // French
  t.fr = fr;
}
