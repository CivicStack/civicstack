/**
 * Module dependencies.
 */

var page = require('page');
var countries = require('countries');
var CategoriesList = require('./view');

page('/admin/countries', countries.middleware, function (ctx, next) {
  var countrieslist = new CategoriesList({
    el: '.admin-content',
    replace: true,
    data: {
      countries: countries.items
    }
  });
});
