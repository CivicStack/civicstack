var config = require('lib/config');
var disqusSSO = require('disqus-sso-express');

var disqusPublicKey = config.auth.disqus.clientID;
var disqusSecret = config.auth.disqus.clientSecret;

module.exports = disqusSSO({
  publicKey: disqusPublicKey,
  secret: disqusSecret
});
