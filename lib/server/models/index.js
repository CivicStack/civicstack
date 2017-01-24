/*
 *  Module dependencies
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// TODO: Make it configurable
const mongoUrl = 'mongodb://localhost/civicstack2'

/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */

module.exports = function models (app) {

  /*
   *  Connect to mongo
   */

  mongoose.connect(mongoUrl, { db: { safe: true }});

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
