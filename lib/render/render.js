/**
 * Module dependencies.
 */

var domify = require('domify');
var merge = require('merge-util');

/**
 * Render default modules
 */

var t = require('t');
var config = require('config');

exports = module.exports = render;
exports.dom = dom;

function render(template, options) {
  var defaults = {
    t: t,
    config: config
  };

  return template(merge(defaults, options, true)).replace("&gt;", ">").replace("&lt;", "<");
}

function dom(template, options) {
  return domify(render(template, options));
}
