/**
 * Module dependencies.
 */

var log = require('debug')('civicstack:admin-licenses-form');
var page = require('page');
var request = require('request');
var licenses = require('licenses');
var LicenseForm = require('./view');

page('/admin/licenses/create', function (ctx, next) {
  var form = new LicenseForm({
    el: '.admin-content',
    replace: true,
    data: {
      license: {}
    }
  });
});

page('/admin/licenses/:id', load, function (ctx, next) {
  var form = new LicenseForm({
    el: '.admin-content',
    replace: true,
    data: {
      license: ctx.license
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/licenses/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load license for ' + ctx.params.id;
      return log(message);
    };

    ctx.license = res.body;
    return next();
  });
}
