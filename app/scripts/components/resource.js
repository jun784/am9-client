'use strict';

Vue.component('resource', {
  template: '#resource',
  replace: true,
  props: ['resource'],

  methods: {
    resolveOverlap: function() {
      var i, ii, target, next;
      var margin = 1000 * 60 * 5;
      var doList = this.resource.do;
      doList.sort((a, b) => {
        return a.start - b.start;
      });

      for (i = 0, ii = doList.length - 1; i < ii; ++i) {
        target = doList[i];
        next = doList[i + 1];

        if (target.start + target.time + margin > next.start) {
          next.start = target.start + target.time + margin;
        }
      }
    }
  }
});
