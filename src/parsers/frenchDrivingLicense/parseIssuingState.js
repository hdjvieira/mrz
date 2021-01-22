'use strict';

module.exports = function parseIssuingState(source) {
  if (source !== 'FRA') {
    throw new Error(`invalid state code: ${source}. Must be FRA`);
  }
  return source;
};
