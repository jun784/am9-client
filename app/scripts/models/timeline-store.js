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
            id: 1,
            body: 'シャワーを浴びる',
            start: new Date(2015, 5, 28, 8, 0).getTime(),
            time: 1000 * 60 * 60 * 2,
            done: false
          }, {
            id: 2,
            body: 'ご飯を食べる',
            start: new Date(2015, 5, 28, 10, 30).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            id: 3,
            body: '掃除をする',
            start: new Date(2015, 5, 28, 11, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            id: 11,
            body: 'お風呂に入る',
            start: new Date(2015, 5, 28, 13, 0).getTime(),
            time: 1000 * 60 * 115,
            done: false
          }, {
            id: 12,
            body: 'カラオケ',
            start: new Date(2015, 5, 28, 15, 0).getTime(),
            time: 1000 * 60 * 55,
            done: false
          }, {
            id: 13,
            body: '◯◯の開発',
            start: new Date(2015, 5, 28, 17, 0).getTime(),
            time: 1000 * 60 * 175,
            done: false
          }]
        },
        {
          id: 2,
          doing: [{
            id: 4,
            body: 'シャワーを浴びる',
            start: new Date(2015, 5, 28, 14, 0).getTime(),
            time: 1000 * 60 * 60 * 2,
            done: false
          }, {
            id: 5,
            body: 'ご飯を食べる',
            start: new Date(2015, 5, 28, 16, 30).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            id: 6,
            body: '掃除をする',
            start: new Date(2015, 5, 28, 17, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }]
        },
        {
          id: 3,
          doing: [{
            id: 7,
            body: 'Vue の勉強',
            start: new Date(2015, 5, 28, 13, 0).getTime(),
            time: 1000 * 60 * 55,
            done: false
          }, {
            id: 8,
            body: 'お菓子を食べる',
            start: new Date(2015, 5, 28, 14, 0).getTime(),
            time: 1000 * 60 * 25,
            done: false
          }, {
            id: 9,
            body: '昼寝をする',
            start: new Date(2015, 5, 28, 14, 30).getTime(),
            time: 1000 * 60 * 115,
            done: false
          }, {
            id: 10,
            body: '打ち合わせ',
            start: new Date(2015, 5, 28, 16, 30).getTime(),
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

  addDoing(resourceId, doing) {
    var resource = null;
    for (let i = 0, ii = this.data.resources.length; i < ii; ++i) {
      if (this.data.resources[i].id === resourceId) {
        resource = this.data.resources[i];
      }
    }

    if (resource === null) {
      return;
    }

    resource.doing.push(doing);

    this.trigger('addDoing', { resourceId, doing });
  }
}

export {TimelineStore};
