/**
 * Module dependencies.
 */

var page = require('page');
var technologies = require('technologies');
var TechnologiesList = require('./view');

page('/admin/technologies', technologies.middleware, function (ctx, next) {
  var technologieslist = new TechnologiesList({
    el: '.admin-content',
    replace: true,
    data: {
      technologies: technologies.items
    }
  });
});
