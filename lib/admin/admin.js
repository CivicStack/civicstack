/**
 * Module dependencies.
 */

var AdminView = require('./view');
var AdminSidebar = require('admin-sidebar');
var log = require('debug')('civicstack:admin');
var page = require('page');
var tags = require('tags');
var user = require('user');

page('/admin', '/admin/apps');

page("/admin/:section?/:id?", valid, user.required, user.isAdmin, function(ctx, next) {
  var section = ctx.params.section;

  var admin = new AdminView({
    el: '.site-content'
  });

  var sidebar = new AdminSidebar({
    el: '.sidebar-container',
    data: {
      selected: section
    }
  });

  // if all good, then jump to section route handler
  next();
});

require('admin-apps-form');
require('admin-apps');
require('admin-categories-form');
require('admin-categories');
require('admin-countries-form');
require('admin-countries');
require('admin-licenses');
require('admin-tags-form');
require('admin-tags');
require('admin-technologies-form');
require('admin-technologies');

/**
 * Check if page is valid
 */

function valid(ctx, next) {
  var section = ctx.params.section = ctx.params.section || 'apps';
  if (/apps|tags|categories|countries|technologies|licenses/.test(section)) return next();
  if (/(apps|tags|categories|countries|technologies|licenses)\/create/.test(section)) return next();
  if (/(apps|tags|categories|countries|technologies|licenses)\/[a-z0-9]{24}\/?$/.test(section)) return next();
  page.redirect('/');
}
