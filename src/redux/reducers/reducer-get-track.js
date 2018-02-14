import { GET_TRACK } from '../../actions/get-track';

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRACK:
      return action.payload.data;
    default:
      return state;
  }
}
