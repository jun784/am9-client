'use strict';

require('./doing.scss');

module.exports = {
  template: require('./doing.html'),
  replace: true,

  ready: function() {
    var isDoing = false;

    $(this.$el)
      .draggable({
        axis: 'y',
        containment: '.doing-wrapper',
        stack: '.doing-item',
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
        start: (event, ui) => {
          isDoing = this.isDoing;
          if (isDoing) {
            ui.element.addClass('doing-doing-resizing');
          }
        },
        resize: (event, ui) => {
          ui.element.width(ui.originalSize.width);
          ui.element.height(ui.size.height);
          this.height = parseInt(ui.element.css('height'));
          this.top = ui.position.top;
        },
        stop: (event, ui) => {
          ui.element.removeClass('doing-doing-resizing');
          ui.element.width(ui.originalSize.width);
          ui.element.height(ui.size.height);
          this.height = parseInt(ui.element.css('height'));
          this.top = ui.position.top;
          this.$parent.resolveConflict(this, isDoing);
        }
      });
  },

  computed: {
    height: {
      get: function() {
        return this.time / this.$parent.$parent.time * this.$parent.$parent.height;
      },

      set: function(val) {
        this.time = val * this.$parent.$parent.time / this.$parent.$parent.height;
      }
    },

    top: {
      get: function() {
        return (this.start - this.$parent.$parent.start) / this.$parent.$parent.time * this.$parent.$parent.height;
      },

      set: function(val) {
        this.start = (val / this.$parent.$parent.height * this.$parent.$parent.time) + this.$parent.$parent.start;
      }
    },

    backgroundHeight: function() {
      return (this.$parent.$parent.currentTime - this.start) / this.$parent.$parent.time * this.$parent.$parent.height;
    },

    isDoing: function() {
      return this.start <= this.$parent.$parent.currentTime && this.$parent.$parent.currentTime < this.start + this.time;
    },

    isDone: function() {
      return this.start + this.time <= this.$parent.$parent.currentTime;
    },

    willDo: function() {
      return this.$parent.$parent.currentTime < this.start;
    }
  }
};
