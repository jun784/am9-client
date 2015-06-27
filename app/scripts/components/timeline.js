'use strict';

import {stores} from '../models/stores';

var timeline = new Vue({
  el: '#timeline',

  data: {
    start: new Date(2015, 5, 28).getTime(),
    time: 1000 * 60 * 60 * 24,
    step: 1000 * 60 * 15,
    stepLength: 15,
    currentTime: new Date().getTime(),

    resources: null
  },

  created: function() {
    stores.timeline.on('fetch', (data) => {
      this.refresh(data);
    });

    stores.timeline.on('updateCurrentTime', (current) => {
      this.currentTime = current.getTime();
    });
  },

  computed: {
    height: function() {
      return this.time / this.step * this.stepLength;
    },

    currentTop: function() {
      return (this.currentTime - this.start) / this.time * this.height;
    }
  },

  methods: {
    refresh: function(timeline) {
      if (timeline.start) {
        this.start = timeline.start;
      }
      if (timeline.time) {
        this.time = timeline.time;
      }
      if (timeline.resources) {
        this.resources = timeline.resources;
      }
    }
  }
});

timeline.refresh({
  resources: [
    {
      do: [{
        body: 'body 1',
        start: new Date(2015, 5, 28, 0, 0).getTime(),
        time: 1000 * 60 * 60 * 2,
        done: false
      }, {
        body: 'body 2',
        start: new Date(2015, 5, 28, 5, 0).getTime(),
        time: 1000 * 60 * 60,
        done: false
      }, {
        body: 'body 3',
        start: new Date(2015, 5, 28, 23, 0).getTime(),
        time: 1000 * 60 * 60,
        done: false
      }]
    },
    {
      do: [{
        body: 'body 2',
        start: new Date(2015, 5, 28, 4, 0).getTime(),
        time: 1000 * 60 * 60 * 2,
        done: false
      }]
    }
  ]
});
