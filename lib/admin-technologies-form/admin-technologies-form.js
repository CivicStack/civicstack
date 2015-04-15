/**
 * Module dependencies.
 */

var log = require('debug')('civicstack:admin-technologies-form');
var page = require('page');
var request = require('request');
var technologies = require('technologies');
var TagForm = require('./view');

page('/admin/technologies/create', function (ctx, next) {
  var form = new TagForm({
    el: '.admin-content',
    replace: true,
    data: {
      technology: {}
    }
  });
});

page('/admin/technologies/:id', load, function (ctx, next) {
  var form = new TagForm({
    el: '.admin-content',
    replace: true,
    data: {
      technology: ctx.technology
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/technologies/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load technology for ' + ctx.params.id;
      return log(message);
    };

    ctx.technology = res.body;
    return next();
  });
}
