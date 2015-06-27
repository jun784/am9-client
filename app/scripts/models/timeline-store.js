'use strict';

import {Store} from './store';

class TimelineStore extends Store {
  constructor() {
    super();
    this.data = [];
    this.currentTime = new Date();

    setInterval(() => {
      this.currentTime = new Date();
      this.trigger('updateCurrentTime', this.currentTime);
    }, 60000);
  }

  fetchData() {

  }
}

export {TimelineStore};
