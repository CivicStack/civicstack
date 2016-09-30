module.exports.id = "merge-tags-categories";

module.exports.up = function (done) {
  var self = this;
  var categories = this.db.collection('categories');
  var tags = this.db.collection('tags');
  categories.find().toArray(function (err, docs) {
    self.log('Inserting ' + docs.length + ' docs');
    tags.insertMany(docs, function (err) {
      self.log('Done: ' + err);
      done(err);
    });
  });
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};