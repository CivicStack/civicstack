/**
 * Module dependencies.
 */

var env = process.env;

/**
 * Expose heroku helper
 */

module.exports = {
  port: env.PORT,
  mongoUrl: env.MONGO_URL,
  locale: env.LOCALE,
  client: env.CLIENT_CONF ? env.CLIENT_CONF.split(',') : [ "env", "locale", "organization name" ],
  auth: {
    twitter: {
      consumerKey: env.TW_CONSUMER_KEY,
      consumerSecret: env.TW_CONSUMER_SECRET,
      callback: env.TW_CALLBACK
    }
  },
  secret: env.SECRET,
  languages: env.LANGUAGES || [ "en", "es" ]
}
