/**
 * Module dependencies.
 */

var config = require('lib/config');
var languages = config('languages');

var i18nSchema = {};

languages.forEach(function (language) {
  i18nSchema[language] = String;
});

module.exports = i18nSchema;
