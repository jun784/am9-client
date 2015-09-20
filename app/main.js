'use strict';

import Vue from 'vue';
import route from 'vue-route';
import resource from 'vue-resource';
import operationSender from './plugins/operation-sender';

Vue.use(route);
Vue.use(resource);
Vue.use(operationSender);

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
