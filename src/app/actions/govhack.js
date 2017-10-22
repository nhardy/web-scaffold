// @flow

export const DUNEDIN_GEOJSON_REQUEST = 'DUNEDIN_GEOJSON_REQUEST';
export const DUNEDIN_GEOJSON_SUCCESS = 'DUNEDIN_GEOJSON_SUCCESS';
export const DUNEDIN_GEOJSON_FAILURE = 'DUNEDIN_GEOJSON_FAILURE';

export function getDunedinGeoJson() {
  return {
    types: [DUNEDIN_GEOJSON_REQUEST, DUNEDIN_GEOJSON_SUCCESS, DUNEDIN_GEOJSON_FAILURE],
    endpoint: {
      url: '/api/govhack/dunedin.geojson',
    },
  };
}
