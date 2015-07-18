'use strict';

var Vue = require('vue');
var route = require('vue-route');

Vue.use(route);

var root = new Vue({
  el: '#app',

  routes: {
    '/personal': {
      componentId: 'personal',
      isDefault: true
    },

    options: {
      hashbang: true
    }
  },

  components: {
    personal: require('./components/personal/personal')
  }
});
