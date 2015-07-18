'use strict';

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
      // console.log(this.things);
      this.things.push({id: Math.random(100), body: ""});
    }
  },

  components: {
    thing
  }
};
