'use strict';

var app = new Vue({
  el: "#container",
  data: {
    main: undefined
  }
});
Vue.component("home", {
  template: "#home"
});
Vue.component("example", {
  template: "#example"
});

page('/', function(ctx) {
  app.main = "home";
});
page('/tmp/example/:q', function(ctx) {
  app.main = "example";
  // ctx.paramsをどうやってexampleコンポーネントに渡す？
});
page();
