/**
 * Module dependencies.
 */

var config = require('config');
var language = require('language');
var page = require('page');
var t = require('t');
var translations = require('translations');
var user = require('user');

/**
 * Initialize lang
 */

var lang = language();

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t` component with config locale
 */

t.lang(lang);

/**
 * Boot components
 * and pages.
 */

require('body-classes');
require('header');
require('sidebar');
require('footer');
require('admin');
require('homepage');
require('login');
require('app-form');
require('application-detail');
require('about');

if (config['google analytics tracking id']) {
  page('*', (ctx, next) => {
    if (window.ga) ga('send', 'pageview', location.pathname);
    next();
  });
}

/**
 * Boot page.js
 */

page();
