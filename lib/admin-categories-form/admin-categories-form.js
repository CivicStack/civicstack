/**
 * Module dependencies.
 */

var log = require('debug')('civicstack:admin-categories-form');
var page = require('page');
var request = require('request');
var categories = require('categories');
var CategoryForm = require('./view');

page('/admin/categories/create', function (ctx, next) {
  var form = new CategoryForm({
    el: '.admin-content',
    replace: true,
    data: {
      category: {}
    }
  });
});

page('/admin/categories/:id', load, function (ctx, next) {
  var form = new CategoryForm({
    el: '.admin-content',
    replace: true,
    data: {
      category: ctx.category
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/categories/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load category for ' + ctx.params.id;
      return log(message);
    };

    ctx.category = res.body;
    return next();
  });
}
