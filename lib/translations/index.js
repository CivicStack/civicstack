/**
 * Module dependencies.
 */

var en = require('./lib/en');
var es = require('./lib/es');
var fr = require('./lib/fr');
var pt = require('./lib/pt');

module.exports.help = function(t) {
  // English
  t.en = en;

  // Spanish
  t.es = es;

  // French
  t.fr = fr;

  // Portuguese
  t.pt = pt;
}
