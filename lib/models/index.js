/*
 *  Module dependencies
 */

var mongoose = require('mongoose');

/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */

module.exports = function models (app) {

  /*
   *  Connect to mongo
   */

  mongoose.connect(app.get('config').mongoUrl, { db: { safe: true }});

  /**
   * Register `User` model
   */

  require('./user');

  /**
   * Register `Application` model
   */

  require('./application');

  /**
   * Register `Tag` model
   */

  require('./tag');

  /**
   * Register `Country` model
   */

  require('./country');

  /**
   * Register `License` model
   */

  require('./license');

  /**
   * Register `Technology` model
   */

  require('./technology');
}
