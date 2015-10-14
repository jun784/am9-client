'use strict';

module.exports = function(value, format) {
  if (format === 'ISO') {
    return value.toISOString();
  }

  return value.format(format);
};
