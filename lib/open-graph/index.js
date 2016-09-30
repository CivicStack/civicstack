var og = require('open-graph-scraper');
var Cache = require('node-cache');

var OpenGraph = function () {
  var cache = new Cache({ stdTTL: 3600 });

  return {
    get: function(url, cb) {
      cache.get(url, function(err, value) {
        if (err) {
          return cb(err);
        }

        // If URL exists in cache, return it
        if (value) {
          return cb(null, value);
        }

        // Get OG data from remote site
        return og({ url: url }, function(err, result) {
          // In case of error, pass control to callback
          if (err) {
            return cb(err);
          }

          // Save in cache
          cache.set(url, result, function() {
            // Return control to callback
            cb(null, result);
          });
        });
      });
    }
  };
};

module.exports = new OpenGraph();
