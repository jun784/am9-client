'use strict';

module.exports = {
  template: require('./thing.html'),
  replace: true,
  data: function() {
    return {
      isEmpty: false
    };
  },
  props: ['thing'],

  ready: function() {
    this.isEmpty = this.thing.body === '';
    this.focus();

    $(this.$$.thing).draggable({
      helper: 'clone',
      appendTo: this.$root.$el,
      revert: 'invalid',
      revertDuration: 300,
      start: (event, ui) => {
        ui.helper.data('thing', this.thing);
      }
    });
  },

  methods: {
    focus: function() {
      this.$$.thingInput.focus();
    },

    onKeyDown: function(e) {
      var which = e.which || e.keyCode;
      if (this.isEmpty && which == 8) { // backspace
        e.preventDefault();
        this.$parent.removeThing(this.thing);
      }
    },

    onInputBody: function(e) {
      this.isEmpty = this.thing.body === '';
      this.$dispatch('thing-updated', this.thing);
    }
  }
};
