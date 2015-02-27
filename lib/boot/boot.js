/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var t = require('t');
var translations = require('translations');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Boot components
 * and pages.
 */

require('header');
require('homepage');
require('restricted');

/**
 * Boot page.js
 */

page();
