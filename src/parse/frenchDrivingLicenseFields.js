'use strict';

const parseDocumentNumber = require('../parsers/frenchDrivingLicense/parseDocumentNumber');
const parseDocumentCode = require('../parsers/frenchDrivingLicense/parseDocumentCode');
const parseIssuingState = require('../parsers/frenchDrivingLicense/parseIssuingState');
const parseSubjectNames = require('../parsers/frenchDrivingLicense/parseSubjectNames');

const {
  documentNumberTemplate,
  documentCodeTemplate,
  issuingStateTemplate,
  expirationDateTemplate,
  compositeCheckDigitTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentCodeTemplate, {
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 0,
    start: 2,
    end: 5,
    parser: parseIssuingState
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 0,
    start: 5,
    end: 14,
    parser: parseDocumentNumber
  }),
  Object.assign({}, compositeCheckDigitTemplate, {
    field: 'firstCompositeCheckDigit',
    line: 0,
    start: 14,
    end: 15,
    related: [
      {
        line: 0,
        start: 0,
        end: 14
      }
    ]
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 0,
    start: 15,
    end: 21
  }),
  {
    label: 'Names',
    field: 'names',
    line: 0,
    start: 21,
    end: 29,
    parser: parseSubjectNames
  },
  Object.assign({}, compositeCheckDigitTemplate, {
    field: 'secondCompositeCheckDigit',
    line: 0,
    start: 29,
    end: 30,
    related: [
      {
        line: 0,
        start: 15,
        end: 29
      }
    ]
  })
].map(createFieldParser);
