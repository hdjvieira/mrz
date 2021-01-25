'use strict';

module.exports = function parseDocumentNumber(source) {
  // french driving license number
  var first = source.substring(0, 2);
  var second = source.substring(2, 4);
  var third = source.substring(4, 9);

  if (!first.match(/^[0-9]{2}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must start with two numeric digits`
    );
  }
  if (!second.match(/^[A-Z]{2}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must have alpha digits in positions 3 and 4`
    );
  }
  if (!third.match(/^[0-9]{5}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must have numeric digits in last 5 positions`
    );
  }

  return {
    value: source.substring(0, 9),
    start: 0,
    end: 9
  };
};
