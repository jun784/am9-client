'use strict';

Vue.component('do', {
  template: '#do',
  replace: true,
  props: ['d'],

  ready: function() {
    var _this = this;

    var onResize = function(event, ui) {
      ui.element.width(ui.originalSize.width);
      ui.element.height(ui.size.height);
      _this.height = parseInt(ui.element.css('height'));
      _this.top = ui.position.top;
      _this.$parent.resolveOverlap(ui.position.top - ui.originalPosition.top < 0);
    };

    $(this.$el)
      .draggable({
        axis: 'y',
        containment: '.do-wrapper',
        stack: '.do-item',
        stop: function(event, ui) {
          _this.top = ui.position.top;
        }
      })
      .resizable({
        handles: 'n, s',
        resize: onResize,
        stop: onResize
      })
      .on({
        // 'mousedown': function() {
        //   $(this).addClass("ui-draggable-dragging");
        // },
        // 'mouseup mouseleave': function() {
        //   $(this).removeClass("ui-draggable-dragging");
        // }
      });
  },

  computed: {
    height: {
      get: function() {
        return this.d.time / this.$root.time * this.$root.height;
      },

      set: function(val) {
        this.d.time = val * this.$root.time / this.$root.height;
      }
    },

    top: {
      get: function() {
        return (this.d.start - this.$root.start) / this.$root.time * this.$root.height;
      },

      set: function(val) {
        this.d.start = (val / this.$root.height * this.$root.time) + this.$root.start;
      }
    },

    backgroundHeight: function() {
      return (this.$root.currentTime - this.d.start) / this.$root.time * this.$root.height;
    },

    isDoing: function() {
      return this.d.start <= this.$root.currentTime && this.$root.currentTime < this.d.start + this.d.time;
    }
  }
});
