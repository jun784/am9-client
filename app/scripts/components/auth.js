function getUrlVars () {
  var vars = {}
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
  for (var i = 0; i < hashes.length; i++) {
    var hash = hashes[i].split('=')
    vars[hash[0]] = hash[1]
  }
  return vars
}

var code = getUrlVars().code

if (code) {
  $.ajax({
    method: 'POST',
    url: '/auth/facebook',
    data: {
      clientId: '966482230069701',
      code: code,
      redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
    },
    dataType: 'json',
    success: function (res) {
      console.log(res)
      localStorage.setItem('token', res.token)
      $.ajax({
        url:'/user',
        method:'GET',
        success: function (data) {
          alert('Hello, ' + data.username + '!!')
        }
      })
    }
  })
}

window.auth = {}
auth.login = function () {
  window.location = 'https://www.facebook.com/dialog/oauth?%20client_id=966482230069701%20&redirect_uri=' + (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
}
auth.check = function () {
  return !!localStorage.getItem('token')
}

auth.logout = function () {
  localStorage.removeItem('token')
}
