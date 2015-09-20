'use strict';

import Vue from 'vue';
import moment from 'moment';
import uuid from 'node-uuid';

require('./resource.scss');

module.exports = {
  template: require('./resource.html'),
  replace: true,

  components: {
    doing: require('../doing/doing')
  },

  created: function() {
    this.$on('doing-added', (idx) => {
      Vue.nextTick(() => {
        this.resolveConflict(this.$.doing[idx]);
      });
    });

    this.$on('thing-time-set', (thing, start, end) => {
      for (let i = 0, ii = this.doings.length; i < ii; i++) {
        if (this.doings[i].thingId === thing.id) {
          let doing = this.doings[i];
          doing.start = start.valueOf();
          doing.time = end.valueOf() - doing.start;

          this.resolveConflict(this.$.doing[i]);
          this.$dispatch('doing-updated', doing);
          return;
        }
      }

      this.doings.push({
        id: uuid.v4(),
        thingId: thing.id,
        body: thing.body,
        startedAt: start.format('YYYY-MM-DDTHH:mmZ'),
        endedAt: end.format('YYYY-MM-DDTHH:mmZ')
      });
    });
  },

  ready: function() {
    var $el = $(this.$el);

    $el.droppable({
      accept: '.thing',
      tolerance: 'pointer',
      over: (event, ui) => {
        ui.helper.addClass('doing-from-thing');
      },
      out: (event, ui) => {
        ui.helper.removeClass('doing-from-thing');
      },
      drop: (event, ui) => {
        var thing = ui.helper.data('thing');

        // create the clone of the helper because the original helper is removed after finished drop function
        var $parent = ui.helper.parent();
        var $helper = ui.helper.clone().appendTo($parent);

        // add a doing after move its element into resource area
        this.convergeThingPosition($helper, () => {
          var pos = this.positionForResource($helper);
          var start = this.$parent.start + (pos.top / this.$parent.height) * this.$parent.time;

          this.doings.push({
            id: uuid.v4(),
            thingId: thing.id,
            body: thing.body,
            startedAt: moment(start).format('YYYY-MM-DDTHH:mmZ'),
            endedAt: moment(start + this.$parent.step * 2).format('YYYY-MM-DDTHH:mmZ')
          });

          this.$emit('doing-added', this.doings.length - 1);

          // ensure the cloned element is removed
          $helper.remove();
        });
      }
    });
  },

  methods: {
    positionForResource: function($target) {
      var target = $target.offset();
      var resource = $(this.$el).offset();

      return {
        left: target.left - resource.left,
        top: target.top - resource.top
      };
    },

    convergeThingPosition: function($helper, done) {
      var deltaLeft = $(this.$el).offset().left - $helper.offset().left;

      $helper.on('transitionend', done)
        .addClass('converging')
        .css('left', parseInt($helper.css('left')) + deltaLeft);
    },

    resolveConflict: function(target, fixed) {
      var i, ii, fixedStart, startIdx, cur, next, doingList;
      var margin = 1000 * 60 * 5;

      // sort doings based on the center position
      doingList = this.$.doing;
      doingList.sort((a, b) => {
        return a.start + a.time / 2 - b.start - b.time / 2;
      });

      // move to upper if the target overlaps the next doing
      startIdx = doingList.indexOf(target);
      next = doingList[startIdx + 1];
      if (!fixed && next && target.start + target.time + margin > next.start) {
        target.start = next.start - target.time - margin;
      }

      // resolve the conflict between target and fixed position
      fixedStart = this.$parent.currentTime;
      for (i = 0, ii = doingList.length; i < ii; ++i) {
        if (fixedStart < doingList[i].start) {
          // detect the start position of conflict resolution
          startIdx = Math.min(startIdx, i);
          break;
        }

        // skip the target position if the fixed flag is unset
        if ((fixed || target !== doingList[i]) && doingList[i].isDoing) {
          fixedStart = doingList[i].start + doingList[i].time;
        }
      }
      // don't move the target if the fixed flag is set
      if (!fixed && target.start < fixedStart + margin) {
        target.start = fixedStart + margin;
      }

      // move the position of doings while the conflict is resolved
      cur = doingList[startIdx];
      for (i = startIdx + 1, ii = doingList.length; i < ii; ++i) {
        next = doingList[i];

        if (next.willDo) {
          if (cur.start + cur.time + margin > next.start) {
            next.start = cur.start + cur.time + margin;
          }

          cur = next;
        }
      }
    }
  }
};
