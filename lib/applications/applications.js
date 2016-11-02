/**
 * Module dependencies.
 */

var Collection = require('collection');

module.exports.all = new Collection('/api/applications');

var approved = new Collection('/api/applications/approved?sort=upvotesCount&order=desc');

approved.on('loaded', function () {

  function translate(app) {
    app.description.es = app.description.es || app.description.en;
    app.website = ensureUrlSchema(app.website);
  }

  /**
   * Curates a provided string by prepending the "http://" schema if
   * it's needed.
   */
  function ensureUrlSchema(someurl) {
      //if the url has no schema (simplified as [characters]://)
      //then schema is prepended
      if (someurl && ! /^.*:\/\//i.test(someurl)) {
        //if url is schema relative (starts with //) then only "http:" is
        //prepended, otherwise full schema "http://" is used
        return /^\/\//.test(someurl) ? "http:" + someurl : "http://" + someurl;
      }
      return someurl;
  }

  approved.items.map(translate);
});



module.exports.approved = approved;
