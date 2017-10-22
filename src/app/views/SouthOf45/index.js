// @flow

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import { setRouteError } from 'app/actions/routeError';
import { getDunedinGeoJson } from 'app/actions/govhack';
import DefaultLayout from 'app/layouts/Default';
import P from 'app/components/P';
import Breakout from 'app/components/Breakout';
import VisualEssay from 'app/components/VisualEssay';
import Stationary from './Stationary';
import styles from './styles.styl';


type Props = {};

@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      const loaded = () => getState().govhack.dunedinGeoJson.loaded;

      if (loaded()) return;

      await dispatch(getDunedinGeoJson());

      if (!loaded()) {
        dispatch(setRouteError({ status: 500 }));
      }
    },
  },
])
@connect(state => ({
  dunedinGeoJson: state.govhack.dunedinGeoJson.data,
}))
export default class SouthOf45View extends Component<Props, void> {
  render() {
    return (
      <DefaultLayout className={styles.root}>
        <Helmet>
          <title>South of 45</title>
        </Helmet>
        <h1>South of 45</h1>
        <P className={styles.paragraph}>
          On this website we will show you analysis to answer various questions including council influence, transport, safety, and housing.
          {' '}
          These graphs and data provide insight that the council can use to address a number of different issues that face Dunedin.
        </P>
        <Breakout>
          <VisualEssay className={styles.essay} Stationary={Stationary}>
            <p>The affordability of residential heating was identified as a measure for investigation</p>
            <p>Let&apos;s take a look at how this varies across Dunedin</p>
            <p>This is yet another statement</p>
            <p>This is the last statement</p>
          </VisualEssay>
        </Breakout>
      </DefaultLayout>
    );
  }
}
