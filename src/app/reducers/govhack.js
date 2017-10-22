// @flow

import type { GovHackState, ReduxAction } from 'app/flowTypes';
import {
  DUNEDIN_GEOJSON_REQUEST,
  DUNEDIN_GEOJSON_SUCCESS,
  DUNEDIN_GEOJSON_FAILURE,
} from 'app/actions/govhack';


const initialState: GovHackState = {
  dunedinGeoJson: {
    data: null,
    loaded: false,
    loading: false,
    error: null,
  },
};

export default function govhackReducer(state: GovHackState = initialState, action: ReduxAction) {
  switch (action.type) {
    case DUNEDIN_GEOJSON_REQUEST:
      return {
        ...state,
        dunedinGeoJson: {
          ...state.dunedinGeoJson,
          loading: true,
        },
      };

    case DUNEDIN_GEOJSON_SUCCESS:
      return {
        ...state,
        dunedinGeoJson: {
          ...state.dunedinGeoJson,
          data: action.response,
          loaded: true,
          loading: false,
          error: null,
        },
      };

    case DUNEDIN_GEOJSON_FAILURE:
      return {
        ...state,
        dunedinGeoJson: {
          ...state.dunedinGeoJson,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
}
