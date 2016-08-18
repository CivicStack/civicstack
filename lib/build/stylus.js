/**
 * Module dependencies.
 */

var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');

module.exports = function (options) {
  options = options || {};

  return function plugin (file, done) {
    if (file.extension !== 'styl') return done();
    file.read(function (err, string) {
      if (err) return done(err);

      file.extension = 'css';

      stylus(string)
        .use(autoprefixer())
        .render(function (err, css) {
          if (err) {
            done(err);
          } else {
            file.string = css;
            done();
          }
        });
    });
  };
};
