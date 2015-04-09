/**
 * Module dependencies.
 */

var has = Object.prototype.hasOwnProperty;
var crypto = require('crypto');
var log = require('debug')('civicstack:utils');

/**
 * Applies a mapping method for user's
 * considering some keys for an object item
 *
 * @param {String} keys
 * @return {Function} map function for `Array.prototype.map`
 * @api public
 */

exports.expose = function expose(keys) {
  keys = keys.split(' ');

  return function(item) {
    var ret = {};

    keys.forEach(function(key) {
      var segments = exports.sanitize(key).split('.');
      var cursor = ret;
      segments.forEach(function(s, i) {
        if (segments.length - 1 > i) cursor = cursor[s] = cursor[s] || {};
        else cursor[s] = exports.get(key, item);
      });
    });

    return ret;
  }
}

/**
 * Get Object's path value
 *
 * @param {String} path
 * @param {Object} obj
 * @return {Mixed}
 * @api public
 */

exports.get = function get(path, obj) {
  return new Function('_', 'return _.' + path)(obj);
}

/**
 * HOP ref.
 */

exports.has = has;

/**
 * MD5 hash generator.
 *
 * @param {String} string String to encrypt.
 * @return {String} MD5 encrypted string.
 * @api public
 */

exports.md5 = function md5(string) {
  return crypto.createHash('md5').update(string).digest("hex");
}

/**
 * Map array of objects by `property`
 *
 * @param {Array} source array of objects to map
 * @param {String} property to map from objects
 * @return {Array} array of listed properties
 * @api private
 */

exports.pluck = function pluck(source, property) {
  return source.map(function(item) { return item[property]; });
};

/**
 * sanitizes some `key`'s name for propper
 * object definition
 *
 * @param {String} key
 * @return {String} sanitized key
 * @api public
 */

exports.sanitize = function sanitize(key) {
  var methods = /\(.*\)/g;
  var chars = /[^a-zA-Z_\.]/g;
  return key.replace(methods, '').replace(chars, '');
}

/**
 * Basic access restriction middleware
 * for authenticated users.
 */

exports.restrict = function restrict(req, res, next) {
  log('Checking for logged in user');

  if (req.user) {
    log('User logged in, moving on...')
    next();
  } else {
    log('User is not logged in. Path %s is restricted.', req.path);
    // we should actually redirect
    // to a login page...
    res.format({
      html: function () {
        //TODO: update this with new credential system
        res.send(403);
      },
      json: function() {
        res.json(403, {
          error: 'Forbidden access',
          action: {
            redirect: '/login'
          }
        })
      }
    });
  }
};

/**
 * Basic admin restriction middleware blocking
 * non-admin users to access some resources
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @api public
 */

exports.admin = function admin(req, res, next) {
  if (!req.user) return log('User not logged in'), res.send(403);
  if (!req.user.admin) return log('User is not from admin'), res.send(403);
  next();
}