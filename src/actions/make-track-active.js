export const MAKE_TRACK_ACTIVE = 'MAKE_TRACK_ACTIVE'; //TODO: move to constants

export function makeTrackActive(track) {
  track.active = true;
  return {
    type: MAKE_TRACK_ACTIVE,
    payload: track
  }
}
