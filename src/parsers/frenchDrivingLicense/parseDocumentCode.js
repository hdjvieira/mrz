'use strict';

module.exports = function parseDocumentCode(source) {
  if (source !== 'D1') {
    throw new Error(`invalid document code: ${source}. Must be D1`);
  }
  return source;
};
