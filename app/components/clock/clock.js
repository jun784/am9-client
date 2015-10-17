'use strict';

import moment from 'moment';
import momentFilter from '../../filters/moment';

require('./clock.scss');

module.exports = {
  template: require('./clock.html'),
  data: function() {
    return {
      datetime: null,
      secondDeg: 0,
      minuteDeg: 0,
      hourDeg: 0
    };
  },

  created: function() {
    this.updateTime();
  },

  methods: {
    updateTime: function() {
      // from moment.js hero clock http://momentjs.com/
      var now = this.datetime = moment();
      this.secondDeg = now.seconds() * 6;
      this.minuteDeg = now.minutes() * 6 + this.secondDeg / 60;
      this.hourDeg = ((now.hours() % 12) / 12) * 360 + 90 + this.minuteDeg / 12;

      setTimeout(this.updateTime.bind(this), 1000);
    }
  },

  filters: {
    moment: momentFilter
  }
};
