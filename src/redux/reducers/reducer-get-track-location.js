import { GET_TRACK_LOCATION } from '../../actions/get-track-location';

export default function(state = null, action) {
  switch (action.type) {
    case GET_TRACK_LOCATION:
      return action.payload.data;
    default:
      return state;
  }
}
