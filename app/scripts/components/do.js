'use strict';

Vue.component('do', {
  template: '#do',
  replace: true,
  props: ['d'],

  computed: {
    height: function() {
      return this.d.time / this.$root.time * this.$root.height;
    },

    top: function() {
      return (this.d.start - this.$root.start) / this.$root.time * this.$root.height;
    }
  }
});
