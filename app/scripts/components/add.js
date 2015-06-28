'use strict';

import {stores} from '../models/stores';

var timeline = new Vue({
  el: '#add',

  ready: function() {
    var _this = this;
    var $el = $(this.$el);


    $el.find("#add-textarea").draggable({
      axis: 'y',
      drag: (event, ui) => {
        this.top = ui.position.top;
      },
      stop: (event, ui) => {
        this.top = ui.position.top;
      }
    })
    $el.find("#add-icon").on({
      'click': function() {
        $el.toggleClass("add-active");
      }
    });
    $el.find("#up-icon").on({
      'click': function() {
        var flag = $el.hasClass("add-drag");
        $el.toggleClass("add-drag");
        $el.find("#add-textarea")
            .attr('style', '')
            .attr('contentEditable', flag)
            .draggable( "option", "disabled", flag );
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
