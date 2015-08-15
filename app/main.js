'use strict';

import Vue from 'vue';
import route from 'vue-route';
import resource from 'vue-resource';

Vue.use(route);
Vue.use(resource);

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
