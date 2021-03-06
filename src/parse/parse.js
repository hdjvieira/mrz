'use strict';

const checkLines = require('./checkLines');
const formats = require('../formats');
const parsers = require('./parsers');

function parseMRZ(lines) {
  lines = checkLines(lines);
  switch (lines.length) {
    case 1: {
      switch (lines[0].length) {
        case 30:
          return parsers.FRENCH_DRIVING_LICENSE(lines);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (French Driving License) characters'
          );
      }
    }
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parsers.TD1(lines);
        case 36: {
          const startLine1 = lines[0].substr(0, 5);
          if (startLine1.match(/I[0-9A-Z<]FRA/)) {
            return parsers.FRENCH_NATIONAL_ID(lines);
          } else {
            return parsers.TD2(lines);
          }
        }
        case 44:
          return parsers.TD3(lines);
        case 9:
          return parsers.SWISS_DRIVING_LICENSE(lines);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters'
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have one, two or three lines, found${
          lines.length
        }`
      );
  }
}

for (const format in formats) {
  parseMRZ[format] = parsers[format];
}

module.exports = parseMRZ;
