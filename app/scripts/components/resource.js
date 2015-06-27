'use strict';

Vue.component('resource', {
  template: '#resource',
  replace: true,
  props: ['resource'],

  methods: {
    resolveOverlap: function() {
      var _this = this;
      var i, ii, target, next;
      var margin = 1000 * 60 * 5;
      var doList = this.resource.do;
      doList.sort((a, b) => {
        return (a.start + a.time / 2) - (b.start + b.time / 2);
      });
      for (i = 0, ii = doList.length - 1; i < ii; ++i) {
        target = doList[i];
        next = doList[i + 1];
        if (i == 0) {
          if (_this.$parent.currentTime > target.start) {
            target.start = _this.$parent.currentTime + margin;
          }
        }
        if (target.start + target.time + margin > next.start) {
          next.start = target.start + target.time + margin;
        }
      }
    }
  }
});
