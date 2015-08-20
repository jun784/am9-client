'use strict';

module.exports = {
  template: require('./thing.html'),
  replace: true,
  props: ['thing'],

  ready: function() {
    this.$$.thingInput.focus()

    $(this.$el).draggable({
      helper: 'clone',
      revert: 'invalid',
      revertDuration: 300,
      start: (event, ui) => {
        ui.helper.data('thing', this.thing)
      }
    })
  },

  methods: {
    stateCheck: function(e) {
      if (e.keyCode == 8) {
        if (this.$$.thingInput.value == "") {
          // TODO : backspace時に文字列がなければthingを削除
        }
      }
    },

    onInputBody: function(e) {
      this.$dispatch('thing-updated', this.thing)
    }
  }
};
