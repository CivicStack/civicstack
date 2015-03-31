/**
 * Module dependencies.
 */

var AdminView = require('./view');
var AdminSidebar = require('admin-sidebar');
var log = require('debug')('civicstack:admin');
var page = require('page');
var tags = require('tags');
var user = require('user');

page("/admin/:section?", valid, user.isAdmin, function(ctx, next) {
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

require('admin-tags');
// require('admin-tags-form');

// page('/admin/tags/create', function (ctx, next) {
//   var form = new TagForm();
//   form.replace('.admin-content');
//   sidebar.set('tags');
// });
//
// page('/admin/tags/:id', loadTag, function (ctx, next) {
//   // force section for edit
//   // as part of list
//   sidebar.set('tags');
//
//   // render law form for edition
//   var form = new TagForm(ctx.tag);
//   form.replace('.admin-content');
// });

/**
 * Check if page is valid
 */

function valid(ctx, next) {
  // test valid section
  var section = ctx.params.section = ctx.params.section || "applications";
  if (/tags/.test(section)) return next();
  if (/tags\/create/.test(section)) return next();
  if (/tags\/[a-z0-9]{24}\/?$/.test(section)) return next();
  page('/');
}
