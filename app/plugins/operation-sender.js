'use strict';

class OperationSender {
  constructor(resource) {
    this.resource = resource;
    this.operations = [];
  }

  add(type, data) {
    if (!('id' in data)) {
      throw new Error('id is required');
    }

    var op = this._pick(data.id);
    if (op === null) {
      this.operations.push({
        type: type,
        data: data
      });
      return;
    }

    switch (op.type) {
      case 'add':
        this._convergeWithAdd(type, data, op);
        break;
      case 'update':
        this._convergeWithUpdate(type, data, op);
        break;
      case 'remove':
        this._convergeWithRemove(type, data, op);
        break;
      default:
        throw new Error(`Unexpected type: ${op.type}`);
    }
  }

  _pick(id) {
    for (let i = 0, ii = this.operations.length; i < ii; i++) {
      if (this.operations[i].data.id === id) {
        return this.operations.splice(i, 1)[0];
      }
    }
    return null;
  }

  _convergeWithAdd(type, newData, existOperation) {
    if (type === 'add') {
      throw new Error('Duplicate add operation');
    }

    if (type === 'remove') {
      return;
    }

    // update
    existOperation.data = newData;
    this.operations.push(existOperation);
  }

  _convergeWithUpdate(type, newData, existOperation) {
    if (type === 'add') {
      throw new Error(`Unexpected add operation after update`);
    }

    if (type === 'remove') {
      this.operations.push({
        type: type,
        data: newData
      });
      return;
    }

    // update
    existOperation.data = newData;
    this.operations.push(existOperation);
  }

  _convergeWithRemove(type, newData, existOperation) {
    throw new Error(`Unexpected ${type} operation after remove`);
  }
}

exports.install = function(Vue, options) {
  Vue.$sender = Vue.prototype.$sender = (resource) => {
    return new OperationSender(resource);
  };
};
