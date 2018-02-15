export const GET_TRACK_LOCATION = 'GET_TRACK_LOCATION'; //TODO: move to constants

export function getTrackLocation(api) {
  //TODO: move async operation to middleware by using module like axios
  const request = fetch(`${__API_BASE__}/${api}`)
    .then(response => response.json())
    .catch(err => { err });

  return {
    type: GET_TRACK_LOCATION,
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
