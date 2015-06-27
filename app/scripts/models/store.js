'use strict';

class Store {
  constructor() {
    this._listeners = {};
  }

  on(name, func) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    this._listeners[name].push(func);
  }

  off(name, func) {
    if (!this._listeners[name]) {
      return;
    }

    var list = this._listeners[name];
    list.splice(list.indexof(func), 1);
  }

  trigger(name, data) {
    if (!this._listeners[name]) {
      return;
    }

    this._listeners[name].forEach(function(func) {
      func(data);
    });
  }
}

export {Store};
