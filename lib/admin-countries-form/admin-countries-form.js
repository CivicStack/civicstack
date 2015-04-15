/**
 * Module dependencies.
 */

var log = require('debug')('civicstack:admin-countries-form');
var page = require('page');
var request = require('request');
var countries = require('countries');
var CountryForm = require('./view');

page('/admin/countries/create', function (ctx, next) {
  var form = new CountryForm({
    el: '.admin-content',
    replace: true,
    data: {
      country: {}
    }
  });
});

page('/admin/countries/:id', load, function (ctx, next) {
  var form = new CountryForm({
    el: '.admin-content',
    replace: true,
    data: {
      country: ctx.country
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/countries/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load country for ' + ctx.params.id;
      return log(message);
    };

    ctx.country = res.body;
    return next();
  });
}
