export default function(state = [], action) {
  //TODO: we shouldn't be manipulating state directly here, needs updating
  state.gridTitle = 'Artists';
  state.gridHeading = 'Who would you like to listen to?';

  return state;
}
