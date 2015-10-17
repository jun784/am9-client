'use strict';

import moment from 'moment';

require('./timeline.scss');

module.exports = {
  template: require('./timeline.html'),
  props: [
    'resources',
    'date'
  ],

  data: function() {
    return {
      start: this.date.valueOf(),
      time: 1000 * 60 * 60 * 24,
      step: 1000 * 60 * 15,
      stepLength: 30,
      currentTime: moment().valueOf()
    };
  },

  components: {
    resource: require('../resource/resource')
  },

  created: function() {
    setInterval(() => {
      this.currentTime = moment().valueOf();
    }, 60000);
  },

  ready: function() {
    var $el = $(this.$el);
    var scrollTop = this.currentTop - $el.height() / 2;
    $el.scrollTop(scrollTop);
  },

  computed: {
    date: {
      set: function(val) {
        this.start = this.date.valueOf();
        this.date = val;
      }
    },

    height: function() {
      return this.time / this.step * this.stepLength;
    },

    currentTop: function() {
      return (this.currentTime - this.start) / this.time * this.height;
    }
  },

  methods: {
    updateCurrentTime: function(current) {
      this.currentTime = current;
    }
  }
};
