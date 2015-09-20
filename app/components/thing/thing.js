'use strict';

import moment from 'moment';

module.exports = {
  template: require('./thing.html'),
  replace: true,
  data: function() {
    return {
      isEmpty: false
    }
  },
  props: ['thing'],

  ready: function() {
    this.isEmpty = this.thing.body == ''
    this.updateBody(this.thing.body)
    this.focus()

    $(this.$el).draggable({
      cancel: '.input',
      helper: 'clone',
      revert: 'invalid',
      revertDuration: 300,
      start: (event, ui) => {
        ui.helper.data('thing', this.thing)
      }
    })
  },

  methods: {
    focus: function() {
      var input = this.$$.thingInput
      input.focus()

      // move the caret to the end
      var range = document.createRange()
      var selection = window.getSelection()
      range.selectNodeContents(input)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    },

    updateBody: function(body) {
      var timeMatch = body.match(/(?:^|\s)((\d{2}:\d{2})-(\d{2}:\d{2}))(?:\s|$)/);
      if (timeMatch) {
        body = body.replace(timeMatch[1], `<span class="time">${timeMatch[1]}</span>`)
        let start = moment(timeMatch[2], 'hh-mm')
        let end = moment(timeMatch[3], 'hh-mm')
        this.$dispatch('thing-time-set', this.thing, start, end)
      }

      this.$$.thingHtml.innerHTML = body
    },

    onKeyDown: function(e) {
      var which = e.which || e.keyCode;
      if (this.isEmpty && which == 8) { // backspace
        e.preventDefault()
        this.$parent.removeThing(this.thing)
      }
    },

    onInputBody: function(e) {
      this.thing.body = $(e.target).text()
      this.updateBody(this.thing.body)

      this.isEmpty = this.thing.body == ''
      this.$dispatch('thing-updated', this.thing)
    }
  }
};
