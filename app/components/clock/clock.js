'use strict';

import moment from 'moment';
import momentFilter from '../../filters/moment';

require('./clock.scss');

module.exports = {
  template: require('./clock.html'),
  data: function() {
    let now = moment();
    let secondDeg = now.seconds() * 6;
    let minuteDeg = now.minutes() * 6 + secondDeg / 60;
    let hourDeg = ((now.hours() % 12) / 12) * 360 + minuteDeg / 12;

    return {
      datetime: now,
      secondDeg,
      minuteDeg,
      hourDeg
    };
  },

  created: function() {
    this.updateTime();
  },

  methods: {
    updateTime: function() {
      let now = moment();
      let delta = now.valueOf() - this.datetime.valueOf();
      this.datetime = now;

      this.secondDeg += delta * 6 / 1000;
      this.minuteDeg += delta / 10 / 1000;
      this.hourDeg += delta / 120 / 1000;

      setTimeout(this.updateTime.bind(this), 1000);
    }
  },

  filters: {
    moment: momentFilter
  }
};
