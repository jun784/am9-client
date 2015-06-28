'use strict';

import {stores} from '../models/stores';

var timeline = new Vue({
  el: '#add',

  ready: function() {
    var _this = this;
    var $el = $(this.$el);

    $(this.$el).find("#add-icon").on({
      'click': function() {
        $el.toggleClass("add-active");
      }
    });

  },

  created: function() {

  },

  computed: {

  },

  methods: {
  }
});


export {timeline}
