'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import resource from 'vue-resource';

require('./main.scss');

Vue.use(VueRouter);
Vue.use(resource);

var App = Vue.extend({});

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.map({
  '/personal': {
    component: require('./components/personal/personal'),
  }
});

router.redirect({
  '/index.html': '/'
});

router.alias({
  '/': '/personal'
});

router.start(App, '#app');
