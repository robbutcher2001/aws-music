import { QUEUE_TRACK } from '../../actions/queue-track';
import { RESHUFFLE_QUEUE } from '../../actions/reshuffle-queue';
import { MAKE_TRACK_ACTIVE } from '../../actions/make-track-active';

export default function(state = [], action) {
  switch (action.type) {
    case QUEUE_TRACK:
      return [ action.payload, ...state ];
    case RESHUFFLE_QUEUE:
      action.payload.active = true;
      return [ action.payload ].concat(state.filter(track => track.id !== action.payload.id));
    case MAKE_TRACK_ACTIVE:
      return state.map(track => {
        track.active = track.id === action.payload.id ? track.active = true : track.active = false;
        return track;
      });
    default:
      return state;
  }
}
