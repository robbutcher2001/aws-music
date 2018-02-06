export const createRowData = originalItems => {
  // We don't want to mutate the original object
  const items = Object.assign([], originalItems);
  const rows = [], size = 4;

  while (items.length > 0) {
    rows.push(items.splice(0, size));
  }

  return rows;
}
