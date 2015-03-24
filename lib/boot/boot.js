/**
 * Module dependencies.
 */

var config = require('config');
var page = require('page');
var t = require('t');
var translations = require('translations');
var user = require('user');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t` component with config locale
 */

t.lang(config.locale);

/**
 * Boot components
 * and pages.
 */

require('body-classes');
require('header');
require('admin');
require('homepage');
require('application-detail');
require('about');
require('restricted');

/**
 * Boot page.js
 */

page();
