/**
 * Module dependencies.
 */

var page = require('page');

page('*', function(ctx, next) {
  $('#header-collapse').collapse('hide');
  next();
});
