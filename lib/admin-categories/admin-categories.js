/**
 * Module dependencies.
 */

var page = require('page');
var categories = require('categories');
var CategoriesList = require('./view');

page('/admin/categories', categories.middleware, function (ctx, next) {
  var categorieslist = new CategoriesList({
    el: '.admin-content',
    replace: true,
    data: {
      categories: categories.items
    }
  });
});
