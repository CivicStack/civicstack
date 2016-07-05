module.exports.id = "extract-email";

module.exports.up = function (done) {
  var log = this.log;
  var users = this.db.collection('users');
  var emails = [];
  users.find().toArray(function (err, docs) {
    docs.forEach(function (doc) {
      if (doc.profiles.github) {
        var email = doc.profiles.github._json.email;
        emails.push({ id: doc._id, email: email });
        log(doc._id + ': ' + email);
      }
    });

    var count = emails.length;
    emails.forEach(function (entry) {
      users.findOneAndUpdate(
        { _id: entry.id },
        { email: entry.email },
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
