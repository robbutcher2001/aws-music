import { QUEUE_TRACK } from '../../actions/queue-track';

export default function(state = [], action) {
  switch (action.type) {
    case QUEUE_TRACK:
      return [ action.payload, ...state ];
    default:
      return state;
  }
}
