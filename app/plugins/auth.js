'use strict';

const APP_ID = '1652238515065693';

exports.install = function(Vue, options) {

  var location = window.location;
  var localStorage = window.localStorage;

  function isLogin() {
    return !!localStorage.getItem('token');
  }

  function login() {
    location.href = `https://www.facebook.com/dialog/oauth?client_id=${APP_ID}&redirect_uri=${location.href}`;
  }

  function logout() {
    return localStorage.removeItem('token');
  }

  function getUrlQueries () {
    var vars = {};
    var hashes = location.href.slice(location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      var hash = hashes[i].split('=');
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  var code = getUrlQueries().code;
  var token = localStorage.getItem('token');

  if (code) {
    // ensure that the user was redirected from facebook login with code
    Vue.http({
      url: '/api/v1/auth/facebook',
      method: 'POST',
      data: {
        clientId: APP_ID,
        code: code,
        redirectUri: location.href
      }
    }).then(function(res) {
      localStorage.setItem('token', res.data.token);
      location.href = '/personal';
    });
  } else if (token) {
    // the user is already logged in
    // set the authorization token to every api request header
    Vue.http.headers.common.Authorization = token;
  }

  Vue.auth = {
    login: login,
    logout: logout,
    isLogin: isLogin
  };
};
