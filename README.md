# am9-client

## API Request
We use [vuejs/vue-resource](https://github.com/vuejs/vue-resource) for API requests.

All API endpoints have `/api/v1` prefix but you do not have to insert it in your codes because the prefix is already defined in a shared configuration as root path. You can write endpoints without the prefix.

```JavaScript
var thing = this.$resource('things/:id');
thing.get({ id: 1 }, (thing) => { // GET request to /api/v1/things/1
  this.thing = thing;
});
```

You must write relative paths for API endpoints. The API prefix will be removed if you write a root relative path.

```JavaScript
// wrong example
var thing = this.$resource('/things/:id');
thing.get({ id: 1 }, (thing) => { // GET request to /things/1
  // ...
})
```
