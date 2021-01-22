'use strict';

var parseText = require('./../parseText');

module.exports = function parseSubjectNames(source) {
  let parsed = parseText(source, /^[A-Z<]+$/);
  // remove multiple < at the end (ex: ROMAIN<<)
  parsed = source.replace(/<{2}.*/, '');
  // replace < with space (ex: JULES<SP)
  parsed = source.replace(/</g, ' ').trim();
  return {
    value: parsed,
    start: 0,
    end: parsed.length
  };
};
