'use strict';

import {stores} from '../models/stores';

var timeline = new Vue({
  el: '#timeline',

  data: {
    start: new Date(2015, 5, 28).getTime(),
    time: 1000 * 60 * 60 * 24,
    step: 1000 * 60 * 15,
    stepLength: 30,
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
        body: 'シャワーを浴びる',
        start: new Date(2015, 5, 28, 8, 0).getTime(),
        time: 1000 * 60 * 60 * 2,
        done: false
      }, {
        body: 'ご飯を食べる',
        start: new Date(2015, 5, 28, 10, 30).getTime(),
        time: 1000 * 60 * 25,
        done: false
      }, {
        body: '掃除をする',
        start: new Date(2015, 5, 28, 11, 0).getTime(),
        time: 1000 * 60 * 25,
        done: false
      }]
    },
    {
      do: [{
        body: 'シャワーを浴びる',
        start: new Date(2015, 5, 28, 6, 0).getTime(),
        time: 1000 * 60 * 25,
        done: false
      }, {
        body: 'ご飯を食べる',
        start: new Date(2015, 5, 28, 6, 30).getTime(),
        time: 1000 * 60 * 25,
        done: false
      }, {
        body: '掃除をする',
        start: new Date(2015, 5, 28, 7, 0).getTime(),
        time: 1000 * 60 * 25,
        done: false
      }]
    }
  ]
});

export {timeline};
