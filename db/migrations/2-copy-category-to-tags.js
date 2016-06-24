module.exports.id = "copy-category-to-tags";

module.exports.up = function (done) {
  var self = this;
  var applications = this.db.collection('applications');
  var fixture = {};
  applications.find().toArray(function (err, docs) {
    docs.forEach(function (doc) {
      fixture[doc.name] = doc.category;
    });

    var ids = Object.keys(fixture);
    var count = ids.length;
    ids.forEach(function (id) {
      var category = fixture[id];
      self.log('Updating ' + id + ' with ' + category);
      applications.findOneAndUpdate(
        { name: id },
        { $push: { tags: category } },
        function (err, result) {
          if (err) return done(err);
          if (--count === 0) return done();
        }
      );
    });
  });
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};