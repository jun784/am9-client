'use strict';

import Vue from 'vue';

require('./login.scss');

module.exports = {
  template: require('./login.html'),

  methods: {
    onClickFacebook: function() {
      Vue.auth.login();
    }
  }
};
