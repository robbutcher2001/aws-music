const s3 = require('./s3');
const dynamo = require('./dynamo');

module.exports = Object.assign(
  {},
  s3,
  dynamo
);
