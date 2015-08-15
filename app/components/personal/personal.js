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

    var today = this.todayStr();

    this._resource = this.$resource('/api/v1/resources/:id');
    this._resource.get({ id: 1, date: this.todayStr() }, (resource) => {
      this.resources = [resource];
    });

    this._thing = this.$resource('/api/v1/things');
    this._thing.get({ date: today }, (things) => {
      this.things = things;
    });
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
