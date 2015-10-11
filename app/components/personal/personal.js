'use strict';

import timeline from '../timeline/timeline';
import add from '../add/add';
import things from '../things/things';
import moment from 'moment';
import _ from 'lodash';

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
    this.$on('thing-updated', (thing) => {
      var doings = this.resources[0].doings;

      _(doings)
        .filter({ thingId: thing.id })
        .forEach((doing) => doing.body = thing.body)
        .value();
    });

    this.$on('thing-removed', (thing) => {
      var doings = this.resources[0].doings;

      _(doings)
        .filter({ thingId: thing.id })
        .forEach(doings.$remove, doings)
        .value();
    });

    var today = moment().format('YYYY-MM-DD');

    this._resource = this.$resource('/api/v1/resources/:id');
    this._resource.get({ id: 1, date: today }, (resource) => {
      this.resources = [resource];
    });

    this._thing = this.$resource('/api/v1/things');
    this._thing.get({ date: today }, (things) => {
      this.things = things;
    });
  },

  components: { timeline, add, things }
};
