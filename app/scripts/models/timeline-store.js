'use strict';

import {Store} from './store';

class TimelineStore extends Store {
  constructor() {
    super();
    this.data = {
      resources: [
        {
          id: 1,
          doing: [{
            body: 'シャワーを浴びる',
            start: new Date(2015, 5, 28, 8, 0).getTime(),
            time: 1000 * 60 * 60 * 2,
            done: false
          }, {
            body: 'ご飯を食べる',
            start: new Date(2015, 5, 28, 10, 30).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            body: '掃除をする',
            start: new Date(2015, 5, 28, 11, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }]
        },
        {
          id: 2,
          doing: [{
            body: 'シャワーを浴びる',
            start: new Date(2015, 5, 28, 6, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            body: 'ご飯を食べる',
            start: new Date(2015, 5, 28, 6, 30).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            body: '掃除をする',
            start: new Date(2015, 5, 28, 7, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }]
        }
      ]
    };
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
