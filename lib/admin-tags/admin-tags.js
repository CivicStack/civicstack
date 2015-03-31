/**
 * Module dependencies.
 */

var page = require('page');
var tags = require('tags');
var TagsList = require('./view');

page('/admin/tags', tags.middleware, function (ctx, next) {
  var tagslist = new TagsList({
    el: '.admin-content',
    replace: true,
    data: {
      tags: tags.items
    }
  });
});
