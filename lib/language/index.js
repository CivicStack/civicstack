/**
 * Module dependencies.
 */

var config = require('lib/config');

module.exports = function language(req, res, next) {
  if (!req.cookies.lang) {
    res.cookie.lang = config('locale');
  } else if (req.query.lang) {
    res.cookie('lang', req.query.lang);
    return res.redirect(req.path);
  }
  next();
}