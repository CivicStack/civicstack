/**
 * Module dependencies.
 */

// TODO: Make it configurable
var languages = ['en', 'es']

var i18nSchema = {}

languages.forEach(function (language) {
  i18nSchema[language] = { type: String }
})

module.exports = i18nSchema
