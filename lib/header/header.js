/**
 * Module dependencies.
 */

var render = require('render');
var reactive = require('reactive');
var template = require('./template');

var html = render.dom(template);
html = reactive(html)

document.querySelector('body').appendChild(html.el);
