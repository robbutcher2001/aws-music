const s3 = require('./s3');
const dynamo = require('./dynamo');
const util = require('./util');

module.exports = Object.assign(
  {},
  s3,
  dynamo,
  util
);
