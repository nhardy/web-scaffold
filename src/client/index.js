import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';
import { syncHistoryWithStore } from 'react-router-redux';
import scriptsManager from 'redux-scripts-manager';
import Nprogress from 'nprogress';
import OfflinePlugin from 'offline-plugin/runtime';

import config from 'app/config';
import createStore from 'app/redux/store';
import Root from './Root';


const store = createStore(window.__data);
const history = syncHistoryWithStore(browserHistory, store);
scriptsManager(store);
const mountPoint = document.getElementById('root');

function render(Component = Root) {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    mountPoint,
  );
}

Nprogress.configure({
  minimum: 0.2,
  easing: 'ease-out',
  speed: 400,
  trickleSpeed: 200,
  showSpinner: false,
  template: '<div class="nprogress-bar" role="bar"><div class="nprogress-peg"></div></div></div>',
});
ReactGA.initialize(config.analytics.trackingId);
render();
OfflinePlugin.install();

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(require('./Root').default); // eslint-disable-line global-require
  });
}

if (__DEVELOPMENT__) {
  // Enable helpful React warnings/errors
  window.React = React;
}
