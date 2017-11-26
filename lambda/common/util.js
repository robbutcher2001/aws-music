'use strict';

const sort = (objects, sortKey) => objects.sort((a, b) => {
  if (a[sortKey] < b[sortKey]) return -1;
  if (a[sortKey] > b[sortKey]) return 1;
  return 0;
});

module.exports = {
  sort
};
