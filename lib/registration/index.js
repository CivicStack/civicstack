/**
 * Module dependencies.
 */

var User = require('mongoose').model('User');

/**
 * Twitter Registration
 *
 * @param {Object} profile PassportJS's profile
 * @param {Function} fn Callback accepting `err` and `user`
 * @api public
 */

exports.twitter = function twitter (profile, fn) {
  var user = new User();

  user.fullName = profile.displayName;
  user.profiles.twitter = profile;
  user.avatar = profile.photos[0].value;

  user.save(function(err) {
    return fn(err, user);
  });
}

/**
 * Github Registration
 *
 * @param {Object} profile PassportJS's profile
 * @param {Function} fn Callback accepting `err` and `user`
 * @api public
 */

exports.github = function twitter (profile, fn) {
  var user = new User();

  user.fullName = profile.displayName;
  user.profiles.github = profile;
  user.avatar = profile._json.avatar_url;
  user.email = profile._json.email;

  user.save(function(err) {
    return fn(err, user);
  });
}

/**
 * Get image url for profile
 *
 * @param {Object} profile
 * @param {String} email
 * @return {String} Profile image url (or `avatar`)
 * @api private
 */

function getImageUrl (profile, email) {
  return profile.imageUrl
    || 'http://gravatar.com/avatar/'.concat(md5(email)).concat('?d=mm&size=200')
    || '';
}

/**
 * MD5
 *
 * @param {String} source
 * @return {String} target
 * @api private
 */

function md5 (source) {
  return require('crypto')
    .createHash('md5')
    .update(source)
    .digest("hex");
}
