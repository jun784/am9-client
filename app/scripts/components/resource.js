'use strict';

Vue.component('resource', {
  template: '#resource',
  replace: true,
  props: ['resource'],

  methods: {
    resolveOverlap: function(reverse) {
      var i, ii, target, next, doList;
      var margin = 1000 * 60 * 5;

      doList = this.resource.do;
      doList.sort((a, b) => {
        return (a.start + a.time - b.start - b.time) / 2;
      });

      if (reverse) {
        for (i = doList.length - 1, ii = 0; i > ii; --i) {
          target = doList[i];
          next = doList[i - 1];

          if (target.start - next.time - margin < next.start) {
            next.start = target.start - next.time - margin;
          }
        }
      } else {
        for (i = 0, ii = doList.length - 1; i < ii; ++i) {
          target = doList[i];
          next = doList[i + 1];

          if (i === 0) {
            if (this.$parent.currentTime > target.start) {
              target.start = this.$parent.currentTime + margin;
            }
          }
          if (target.start + target.time + margin > next.start) {
            next.start = target.start + target.time + margin;
          }
        }
      }
    }
  }
});
