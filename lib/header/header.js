/**
 * Module dependencies.
 */

var render = require('render');
var Vue = require('vue');
var template = require('./template');

var html = render(template);

var Header = Vue.extend({
  template: html
})

var header = new Header({
  el: '#site-header'
});
