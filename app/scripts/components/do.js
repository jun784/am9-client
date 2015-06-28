'use strict';

Vue.component('do', {
  template: '#do',
  replace: true,
  props: ['d'],

  ready: function() {
    var isDoing = false;

    $(this.$el)
      .draggable({
        axis: 'y',
        containment: '.do-wrapper',
        stack: '.do-item',
        drag: (event, ui) => {
          this.top = ui.position.top;
        },
        stop: (event, ui) => {
          this.top = ui.position.top;
          this.$parent.resolveConflict(this);
        }
      })
      .resizable({
        handles: 'n, s',
        start: () => {
          isDoing = this.isDoing;
        },
        resize: (event, ui) => {
          ui.element.width(ui.originalSize.width);
          ui.element.height(ui.size.height);
          this.height = parseInt(ui.element.css('height'));
          this.top = ui.position.top;
        },
        stop: (event, ui) => {
          ui.element.width(ui.originalSize.width);
          ui.element.height(ui.size.height);
          this.height = parseInt(ui.element.css('height'));
          this.top = ui.position.top;
          this.$parent.resolveConflict(this, isDoing);
        }
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
    },

    isDone: function() {
      return this.d.start + this.d.time <= this.$root.currentTime;
    },

    willDo: function() {
      return this.$root.currentTime < this.d.start;
    }
  }
});
