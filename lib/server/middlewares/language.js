// const config = require('lib/config')
const log = require('debug')('civicstack:locale')
const languages = ['en', 'es', 'fr']

const valid = lang => !!~languages.indexOf(lang)

module.exports = function language (req, res, next) {
  const user = req.user
  // let lang = config('locale')
  let lang = 'en'

  if (req.query.lang) {
    // set
    lang = valid(req.query.lang) ? req.query.lang : lang
    log('Setting language %s', lang)

    if (user) {
      log('User %s signed in, changing their language', user.id)
      res.cookie('lang', lang)
      user.lang = lang
      user.save(err => err ? res.send(500) : res.redirect(req.path))
    } else {
      log('No user signed in, setting cookie value to %s', lang)
      return res.cookie('lang', lang).redirect(req.path)
    }
  } else {
    // get
    if (user) {
      if (!user.lang) {
        lang = req.cookies.lang
        res.cookie('lang', lang)
        user.lang = lang
        return user.save(err => err ? res.send(500) : res.redirect(req.path))
      }
      lang = user.lang
    } else {
      lang = req.cookies.lang || lang
    }
    log('Setting language to %s', lang)
    res.cookie('lang', lang)
    req.lang = lang
    next()
  }
}
