export const QUEUE_TRACK = 'QUEUE_TRACK'; //TODO: move to constants

export function queueTrack(api) {
  //TODO: move async operation to middleware by using module like axios
  const request = fetch(`${__API_BASE__}/${api}`)
    .then(response => response.json())
    .catch(err => { err });

  return {
    type: QUEUE_TRACK,
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
