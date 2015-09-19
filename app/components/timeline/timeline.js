'use strict';

import moment from 'moment';

require('./timeline.scss');

module.exports = {
  template: require('./timeline.html'),
  props: {
    resources: Array
  },

  components: {
    resource: require('../resource/resource')
  },

  created: function() {
    this.start = moment().startOf('day').valueOf();
    this.time = 1000 * 60 * 60 * 24;
    this.step = 1000 * 60 * 15;
    this.stepLength = 30;
    this.currentTime = moment().valueOf();

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
