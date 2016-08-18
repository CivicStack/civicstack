module.exports.id = "set-default-contact";

module.exports.up = function (done) {
  var self = this;
  this.log('Setting default contact for all applications')
  var applications = this.db.collection('applications');
  applications.find({ contact: '' }).toArray(function (err, docs) {
    if (err) {
      return done(err);
    }

    var count = docs.length;
    if (!count) {
      return done();
    }

    docs.forEach(function (doc) {
      applications.findOneAndUpdate({
        _id: doc._id
      }, {
        $set: {
          contact: 'contacto@democraciaenred.org'
        }
      }, function (err, result) {
        if (err) {
          return done(err);
        }
        count--;
        self.log(count, doc._id);
        if (count === 0) {
          return done();
        }
      });
    });
  });
};

module.exports.down = function (done) {
  var self = this;
  this.log('Unsetting contact for all applications')
  var applications = this.db.collection('applications');
  applications.find({ contact: 'contacto@democraciaenred.org' }).toArray(function (err, docs) {
    if (err) {
      return done(err);
    }

    var count = docs.length;
    if (!count) {
      return done();
    }

    docs.forEach(function (doc) {
      applications.findOneAndUpdate({
        _id: doc._id
      }, {
        contact: ''
      }, function (err, result) {
        if (err) {
          return done(err);
        }
        count--;
        self.log(count, doc._id);
        if (count === 0) {
          return done();
        }
      });
    });
  });
};
