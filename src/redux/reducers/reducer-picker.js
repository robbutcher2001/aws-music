import { FETCH_ARTISTS } from '../../actions/fetch-artists';
import { FETCH_ALBUMS } from '../../actions/fetch-albums';
import { FETCH_TRACKS } from '../../actions/fetch-tracks';

const KEY_FIELD = 'id';

const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ARTISTS:
      // Do not mutate the state by doing something like state.push(). The following
      // returns a new array object and not a mutated version of the state argument
      // passed to this function.
      // return action.payload.data.concat(...state);
      // return {
      //   ...state,
      //   artists: action.payload.data
      // };
      return { artists: action.payload.data };
    case FETCH_ALBUMS:
      return { albums: action.payload.data };
    case FETCH_TRACKS:
      return { tracks: action.payload.data };
    default:
      return state;
  }
}
