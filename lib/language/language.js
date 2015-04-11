/**
 * Module dependencies.
 */

var config = require('config');
var cookie = require('cookie');

function language(lang) {
  lang = lang || cookie('lang') || config.locale;

  if (lang != cookie('lang')) {
    cookie('lang', lang);
    location.reload();
  }

  return lang;
}

module.exports = language;