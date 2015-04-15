/**
 * Module dependencies.
 */

var page = require('page');
var licenses = require('licenses');
var LicensesList = require('./view');

page('/admin/licenses', licenses.middleware, function (ctx, next) {
  var licenseslist = new LicensesList({
    el: '.admin-content',
    replace: true,
    data: {
      licenses: licenses.items
    }
  });
});
