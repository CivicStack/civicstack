/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var debug = require('debug')('civicstack:auth:routes');

/**
 * Lazy create app
 */

var app;

/**
 * Expose auth app
 */

module.exports = app = express();

/**
 * Logout
 */

app.get('/logout'
  , logout
  , function (req, res, next) {
    res.redirect('/');
  }
);

/*
 * Twitter Auth routes
 */

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback'
  , logout
  , passport.authenticate('twitter', { failureRedirect: '/' })
  , function(req, res) {
    // After successful authentication
    // redirect to homepage.
    debug('Log in user %s', req.user.id);
    res.redirect('/');
  }
);

/**
 * Logs user out
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @api private
 */

function logout (req, res, next) {
  if (req.user) {
    debug('Log out user %s', req.user.id);
    req.logout();
  }
  next();
}
