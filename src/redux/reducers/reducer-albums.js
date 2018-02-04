import { FETCH_ALBUMS } from '../../actions/fetch-albums';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ALBUMS:
    return action.payload.data;

    default:
      return state;
  }
}
