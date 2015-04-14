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
    },
    github: {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callback: env.GITHUB_CALLBACK
    }
  },
  secret: env.SECRET,
  languages: env.LANGUAGES || [ "en", "es" ],
  admins: {
    twitter: env.TWITTER_ADMINS ? env.TWITTER_ADMINS.split(',') : undefined,
    github: env.GITHUB_ADMINS ? env.GITHUB_ADMINS.split(',') : undefined
  }
}
