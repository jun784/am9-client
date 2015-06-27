'use strict';

new Vue({
  el: '#timeline',

  data: {
    start: new Date('2015-06-27T00:00+0900').getTime(),
    time: 1000 * 60 * 60 * 24,
    step: 1000 * 60 * 15,
    stepLength: 18,

    resources: [{
      do: [
        {
          body: 'body',
          start: new Date('2015-06-27T03:00+0900').getTime(),
          time: 1000 * 60 * 60
        },
        {
          body: 'body',
          start: new Date('2015-06-27T18:00+0900').getTime(),
          time: 1000 * 60 * 60 * 3
        }
      ]
    }, {
      do: [
        {
          body: 'body',
          start: new Date('2015-06-27T03:00+0900').getTime(),
          time: 1000 * 60 * 60
        },
        {
          body: 'body',
          start: new Date('2015-06-27T18:00+0900').getTime(),
          time: 1000 * 60 * 60 * 3
        }
      ]
    }]
  },

  computed: {
    height: function() {
      return this.time / this.step * this.stepLength;
    }
  }
});
