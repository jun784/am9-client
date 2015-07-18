import timeline from '../timeline/timeline';
import add from '../add/add';
import things from '../things/things';

require('./personal.scss');

module.exports = {
  template: require('./personal.html'),

  created: function() {
    this.$on('doing-added', (idx) => {
      this.$broadcast('doing-added', idx);
    });

    this.things = [{
      id: '1',
      body: 'abc1',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '2',
      body: 'abc2',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '3',
      body: 'abc3',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    }];

    // dummy data
    this.resources = [
      {
        id: 1,
        doings: [{
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
      }
    ];
  },

  components: { timeline, add, things }
};
