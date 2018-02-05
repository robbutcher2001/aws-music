export const FETCH_TRACKS = 'FETCH_TRACKS'; //TODO: move to constants

export function fetchTracks(api) {
  //TODO: move async operation to middleware by using module like axios
  const request = fetch(`${__API_BASE__}/${api}`)
    .then(response => response.json())
    .catch(err => { err });

  return {
    type: FETCH_TRACKS,
    payload: request
  }
}
//
// const handleError = err => {
//   return {
//     type: FETCH_ALBUMS,
//     payload: err
//   }
//   console.error(err);
// };
