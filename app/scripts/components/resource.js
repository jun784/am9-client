'use strict';

Vue.component('resource', {
  template: '#resource',
  replace: true,
  props: ['resource'],

  methods: {
    resolveDrop: function(target) {
      var i, ii, fixedStart, cur, next, doList, resolved;
      var margin = 1000 * 60 * 5;

      // sort doings based on the center position
      doList = this.resource.do;
      doList.sort((a, b) => {
        return (a.start + a.time - b.start - b.time) / 2;
      });

      // move to upper if the target overlaps the next doing
      next = doList[doList.indexOf(target) + 1];
      if (next && target.start + target.time + margin > next.start) {
        target.start = next.start - target.time - margin;
      }

      // resolve the conflict between target and fixed position
      fixedStart = this.$parent.currentTime;
      for (i = 0, ii = doList.length; i < ii; ++i) {
        if (fixedStart < doList[i].start) {
          break;
        }

        if (doList[i].isDoing) {
          fixedStart = doList[i].start;
        }
      }
      if (target.start < fixedStart + margin) {
        target.start = fixedStart + margin;
      }

      // move the position of doings while the conflict is resolved
      for (i = 0, ii = doList.length - 1; i < ii; ++i) {
        target = doList[i];
        next = doList[i + 1];
        if (target.start + target.time + margin > next.start) {
          next.start = target.start + target.time + margin;
        }
      }
    },

    resolveResize: function(reverse) {
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
