'use strict';

import timeline from '../timeline/timeline';
import add from '../add/add';
import things from '../things/things';

require('./personal.scss');

module.exports = {
  template: require('./personal.html'),
  data: function() {
    return {
      resources: [],
      things: []
    };
  },

  created: function() {
    this.$on('doing-added', (idx) => {
      this.$broadcast('doing-added', idx);
    });

    var resource = this.$resource('/api/v1/resources/:id');
    resource.get({ id: 1, date: this.todayStr() }, (resource) => {
      this.resources = [resource];
    });

    this.things = [{
      id: '1',
      body: 'abc1',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '2',
      body: 'abc2',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '3',
      body: 'abc3',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    }];
  },

  methods: {
    todayStr: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var date = ('0' + today.getDate()).slice(-2);
      return `${year}-${month}-${date}`;
    }
  },

  components: { timeline, add, things }
};
