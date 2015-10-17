'use strict';

import Vue from 'vue';
import clock from '../clock/clock';

require('./login.scss');

module.exports = {
  template: require('./login.html'),

  methods: {
    onClickFacebook: function() {
      Vue.auth.login();
    }
  },

  components: { clock }
};
