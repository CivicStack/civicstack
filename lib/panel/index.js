/**
 * Module dependencies.
 */

var render = require('render');
var template = require('./template')

function Panel(opts) {
  if (!(this instanceof Panel)) {
    return new Panel(opts);
  }

  var panel = render.dom(template, opts);

  if (opts.el) {
    opts.el.appendChild(panel);
  }
}

module.exports = Panel;
