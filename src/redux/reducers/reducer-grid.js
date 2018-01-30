export default function(state = [], action) {
  const gridInfo = {
    gridTitle: 'Tunes',
    gridHeading: ''
  }

  return state.concat(gridInfo);
}
