import { GET_TRACK_META } from '../../actions/get-track-meta';

export default function(state = null, action) {
  switch (action.type) {
    case GET_TRACK_META:
      return action.payload;
    default:
      return state;
  }
}
