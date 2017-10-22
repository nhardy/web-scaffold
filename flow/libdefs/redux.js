// @flow

import type { Store } from 'redux';

export type ReduxAction = {
  type: string,
};

export type GovHackState = {
  dunedinGeoJson: {
    data: ?{},
    loaded: boolean,
    loading: boolean,
    error: ?{},
  },
};

export type ReduxState = {
  govhack: GovHackState,
};

export type ReduxStore = Store<ReduxState, any>;
