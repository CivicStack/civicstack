var log = require('debug')('civicstack:disqus');
var encode = require('lib/disqus').encode;

module.exports = function(req, res, next) {
  if (typeof req.user === 'object') {
    req.session.disqus = req.user.disqus = encode({
      id: req.user.id,
      username: req.user.fullName,
      email: req.user.email,
      avatar: req.user.avatar
    });
    log('Disqus data:', JSON.stringify(req.user.disqus));
  }

  next();
}
