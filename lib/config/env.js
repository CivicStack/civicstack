/**
 * Module dependencies.
 */

var env = process.env;

/**
 * Expose heroku helper
 */

module.exports = {
  host: env.HOST,
  port: env.PORT,
  mongoUrl: env.MONGO_URL,
  locale: env.LOCALE,
  client: env.CLIENT_CONF ? env.CLIENT_CONF.split(',') : [ "env", "locale", "organization name", "google analytics tracking id", "host" ],
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
  languages: env.LANGUAGES || [ "en", "es", "fr" ],
  admins: {
    twitter: env.TWITTER_ADMINS ? env.TWITTER_ADMINS.split(',') : undefined,
    github: env.GITHUB_ADMINS ? env.GITHUB_ADMINS.split(',') : undefined
  },
  'google analytics tracking id' : env.GOOGLE_ANALYTICS_TRACKING_ID
}
