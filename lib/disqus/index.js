var crypto = require('crypto');
var config = require('lib/config');

var disqusPublicKey = config.auth.disqus.clientID;
var disqusSecret = config.auth.disqus.clientSecret;

module.exports.encode = function encode(data) {
  var message = new Buffer(JSON.stringify(data)).toString('base64');
  var timestamp = Math.round(+new Date() / 1000);
  var signature = crypto
    .createHmac('sha1', disqusSecret)
    .update(message + ' ' + timestamp)
    .digest('hex');

  return {
    pubKey: disqusPublicKey,
    auth: message + " " + signature + " " + timestamp
  };
}
