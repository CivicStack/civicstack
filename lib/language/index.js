/**
 * Module dependencies.
 */

var config = require('lib/config');
var log = require('debug')('civicstack:language');
var languages = [ 'en', 'es' ];

module.exports = function language(req, res, next) {
  var user = req.user;
  var lang = config('locale');

  if (req.query.lang) {
    // set
    lang = valid(req.query.lang) ? req.query.lang : lang;

    log('Setting language %s', lang);
    if (user) {
      log('User %s signed in, changing their language', user.id);
      res.cookie('lang', lang);
      user.lang = lang;
      user.save(function (err) {
        if (err) return res.send(500);
        return res.redirect(req.path);
      });
    } else {
      log('No user signed in, setting cookie value to %s', lang);
      return res.cookie('lang', lang).redirect(req.path);
    }
  } else {
    // get
    if (user) {
      if (!user.lang) {
        lang = req.cookies.lang
        res.cookie('lang', lang);
        user.lang = lang;
        return user.save(function (err) {
          if (err) return res.send(500);
          return res.redirect(req.path);
        });
      }
      lang = user.lang;
    } else {
      lang = req.cookies.lang || lang;
    }
    log('Setting language to %s', lang);
    res.cookie('lang', lang);
    next();
  }
}

function valid(lang) {
  return !!~languages.indexOf(lang);
}