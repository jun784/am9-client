'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import resource from 'vue-resource';
import auth from './plugins/auth';

require('./main.scss');

Vue.use(VueRouter);
Vue.use(resource);

Vue.http.options.root = '/api/v1';

Vue.use(auth);

var App = Vue.extend({});

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.map({
  '/personal': {
    component: require('./components/personal/personal'),
    auth: true
  },
  '/login': {
    component: require('./components/login/login')
  }
});

router.redirect({
  '/index.html': '/'
});

router.alias({
  '/': '/personal'
});

router.beforeEach(function({ to, next, redirect }) {
  if (to.auth && !Vue.auth.isLogin()) {
    redirect('/login');
  } else {
    next();
  }
});

router.start(App, '#app');
