/**
 * Module dependencies.
 */

var Login = require('./view')
var page = require('page');
var user = require('user');

page('/login', function(ctx, next) {
  if (user.logged()) return next();

  var login = new Login();
  login.render('body');
});
