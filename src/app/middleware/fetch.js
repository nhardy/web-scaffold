// @flow

import qs from 'querystring';
import { isEmpty } from 'lodash-es';

import type { ReduxAction } from 'app/flowTypes';
import config from 'app/config';
import type { CheckStatusError } from 'app/lib/fetch';
import { checkStatus } from 'app/lib/fetch';


type FetchAction = {
  types: [string, string, string],
  endpoint: {
    url: string,
    query?: {},
  },
};

export default function fetchMiddleware() {
  return (next: (ReduxAction) => void) => (action: ReduxAction | FetchAction): void | Promise<void> => {
    const { types, endpoint, ...rest } = action;
    if (!endpoint) {
      return next(action);
    }

    const { url: _url, query = {}, ...requestOptions } = endpoint;
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    let url = _url;
    if (__SERVER__) {
      // Relative URLs don't work on the server, so we need to use a fully qualified URL
      if (_url.startsWith('/')) {
        // The Azure App Service uses named ports, which cannot be used in a HTTP call
        const canUseInternalUrl = /^\d+$/.test(config.port);
        url = `${canUseInternalUrl ? `http://localhost:${config.port}` : config.publicUrl}${_url}`;
      }
    }
    const search = isEmpty(query) ? '' : `?${qs.stringify(query)}`;

    return fetch(`${url}${search}`, requestOptions)
      .then(checkStatus)
      // $FlowFixMe
      .then((raw: Response) => raw.json())
      .then(
        (response: {}) => next({
          ...rest,
          response,
          type: SUCCESS,
        }),
        (error: Error | CheckStatusError) => next({
          ...rest,
          error,
          type: FAILURE,
        }),
      )
      .catch((error: Error | {}) => {
        // eslint-disable-next-line no-console
        console.error('ERROR IN MIDDLEWARE:', error.stack || error);
        next({
          ...rest,
          error,
          type: FAILURE,
        });
      });
  };
}
