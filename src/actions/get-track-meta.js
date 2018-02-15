export const GET_TRACK_META = 'GET_TRACK_META'; //TODO: move to constants

export function getTrackMeta(track) {
  return {
    type: GET_TRACK_META,
    payload: track
  }
}
