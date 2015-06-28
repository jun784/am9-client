'use strict';

import {stores} from '../models/stores';

new Vue({
  el: '#add',
  props: ['resource-id'],

  ready: function() {
    var _this = this;
    var $el = $(this.$el);
    var $textarea = $el.find('#add-textarea');

    $textarea.draggable({
      axis: 'y',
      disabled: true,
      drag: (event, ui) => {
        this.top = ui.position.top;
      },
      stop: (event, ui) => {
        this.top = ui.position.top;
        stores.timeline.addDoing(this.resourceId, {
          body: $textarea.text(),
          start: new Date().getTime(),
          time: 1000 * 60 * 25
        });
        $el.removeClass('add-active');
        $textarea.text("");
      }
    });
    $el.find("#add-icon").on({
      'click': () => {
        var flag = $el.hasClass("add-active");
        $el.toggleClass("add-active");
        $el.removeClass("add-drag")
        $el.find("#add-textarea")
            .attr('style', '')
            .attr('contentEditable', true)
            .draggable("option", "disabled", true)
            .focus();
      }
    });
    $el.find("#up-icon").on({
      'click': () => {
        var flag = $el.hasClass("add-drag");
        $el.toggleClass("add-drag");
        $el.find("#add-textarea")
            .attr('style', '')
            .attr('contentEditable', flag)
            .draggable("option", "disabled", flag);
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
