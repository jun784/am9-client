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
    removeThing: function(thing) {
      var index = this.things.indexOf(thing);
      this.things.splice(index, 1);

      this.$dispatch('thing-removed', thing);

      // update focus
      if (this.things.length > 0) {
        this.$.thing[index - 1].focus();
      }
    },

    onClickAddThing: function(title) {
      var thing = { id: uuid.v4(), body: '' };
      this.things.push(thing);
      this.$dispatch('thing-added', thing);
    }
  },

  components: {
    thing
  }
};
