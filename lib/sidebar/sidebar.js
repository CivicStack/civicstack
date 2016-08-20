var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var template = require('./template');
var user = require('user');

var doClose = true;
document.body.addEventListener('click', function onWindowClick () {
  if (doClose) sidebar.close();
  doClose = true;
});

var sidebar = module.exports = new Ractive({
  isolated: true,
  template: render(template),
  el: 'body',
  append: true,
  data: {
    user: user
  },
  onrender: function () {
    this.set('lang', language());
    this.on('lang', function (ev, lang) {
      ev.original.preventDefault();
      window.location = window.location.pathname + '?lang=' + lang;
    });
  },
  stopPropagation: function stopPropagation (evt) {
    doClose = false;
  },
  open: function open () {
    document.body.classList.add('sidebar-is-open');
    doClose = false;
    return false;
  },
  close: function close () {
    document.body.classList.remove('sidebar-is-open');
    return false;
  }
});

user.on('ready', function () {
  sidebar.set('user', user);
});
