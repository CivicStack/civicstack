var Ractive = require('ractive');
var render = require('render');
var template = require('./template');

module.exports = Ractive.extend({
  isolated: true,
  template: render(template),
  onrender: function () {
    var self = this;
    this.on('saveEditedLink', function (ev) {
      ev.context.editing = false;
      this.set('adding', false);
      this.update();
    });

    this.on('editLink', function (ev) {
      this.set('links.*.editing', false);
      ev.context.editing = true;
      this.set('adding', true);
      this.update();
    });

    this.on('removeLink', function (ev) {
      function indexOf (arr, fn) {
        for (var i = 0; i < arr.length; i++) {
          if (fn(arr[i])) {
            return i;
          }
        }
        return -1;
      }

      var currentIndex = ev.context.index;
      var idx = indexOf(this.get('links'), function (v) {
        return v.index === currentIndex;
      });

      this.splice('links', idx, 1).then(function () {
        self.update();
      });
    });

    function nextIndex () {
      function max (arr) {
        var m = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].index > m) {
            m = arr[i].index;
          }
        }

        return m;
      }

      return max(self.get('links')) + 1;
    }

    this.on('addLink', function (ev) {
      this.push('links', { url: 'http://', description: '', editing: true, index: nextIndex() });
      this.set('adding', true);
    });
  }
});
