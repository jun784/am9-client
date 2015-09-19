'use strict';

import uuid from 'node-uuid';

require('./things.scss');

import thing from '../thing/thing';

module.exports = {
  template: require('./things.html'),
  replace: true,
  props: ['things'],

  ready: function() {

  },

  created: function() {

  },

  computed: {

  },

  methods: {
    onClickMoveThing: function() {
      // this.things.push({id: Math.random(100), title: title });
    },
    onClickAddThing: function(title) {
      this.things.push({ id: uuid.v4(), body: '' });
    }
  },

  components: {
    thing
  }
};
