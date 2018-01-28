import { FETCH_ARTISTS } from '../../actions/fetch-artists';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ARTISTS:
    // Do not mutate the state by doing something like state.push(). The following
    // returns a new array object and not a mutated version of the state argument
    // passed to this function.
    return [ action.payload.data, ...state ];
  }

  return state;
}
