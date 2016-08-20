/**
 * Module dependencies.
 */

var Collection = require('collection');

module.exports.all = new Collection('/api/applications');

var approved = new Collection('/api/applications/approved?sort=upvotesCount&order=desc');

approved.on('loaded', function () {

  function translate(app) {
    app.description.es = app.description.es || app.description.en;
  }

  approved.items.map(translate);
});

module.exports.approved = approved;
