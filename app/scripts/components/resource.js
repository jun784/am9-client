'use strict';

Vue.component('resource', {
  template: '#resource',
  replace: true,
  props: ['resource'],

  methods: {
    resolveConflict: function(target, fixed) {
      var i, ii, fixedStart, startIdx, cur, next, doList;
      var margin = 1000 * 60 * 5;

      // sort doings based on the center position
      doList = this.$.do;
      doList.sort((a, b) => {
        return (a.d.start + a.d.time - b.d.start - b.d.time) / 2;
      });

      // move to upper if the target overlaps the next doing
      startIdx = doList.indexOf(target);
      next = doList[startIdx + 1];
      if (!fixed && next && target.d.start + target.d.time + margin > next.d.start) {
        target.d.start = next.d.start - target.d.time - margin;
      }

      // resolve the conflict between target and fixed position
      fixedStart = this.$parent.currentTime;
      for (i = 0, ii = doList.length; i < ii; ++i) {
        if (fixedStart < doList[i].d.start) {
          // detect the start position of conflict resolution
          startIdx = Math.min(startIdx, i);
          break;
        }

        // skip the target position if the fixed flag is unset
        if ((fixed || target !== doList[i]) && doList[i].isDoing) {
          fixedStart = doList[i].d.start + doList[i].d.time;
        }
      }
      // don't move the target if the fixed flag is set
      if (!fixed && target.d.start < fixedStart + margin) {
        target.d.start = fixedStart + margin;
      }

      // move the position of doings while the conflict is resolved
      cur = doList[startIdx];
      for (i = startIdx + 1, ii = doList.length; i < ii; ++i) {
        next = doList[i];

        if (next.willDo) {
          if (cur.d.start + cur.d.time + margin > next.d.start) {
            next.d.start = cur.d.start + cur.d.time + margin;
          }

          cur = next;
        }
      }
    }
  }
});
