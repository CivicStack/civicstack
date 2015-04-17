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
require('close-navbar');
require('header');
require('footer');
require('admin');
require('homepage');
require('login');
require('app-form');
require('application-detail');
require('about');

/**
 * Boot page.js
 */

page();
