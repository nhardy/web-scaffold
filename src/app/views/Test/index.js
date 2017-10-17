// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';
import Breakout from 'app/components/Breakout';
import VisualEssay from 'app/components/VisualEssay';
import styles from './styles.styl';


const Stationary = ({ index }: { index: number}) => (
  <div className={styles.stationary}>
    {index}
  </div>
);

const TestView = () => (
  <DefaultLayout className={styles.root}>
    <Helmet>
      <title>Test</title>
    </Helmet>
    <h1>Test</h1>
    <Breakout>
      <VisualEssay className={styles.essay} Stationary={Stationary}>
        <p>This is a statement</p>
        <p>This is another statement</p>
        <p>This is yet another statement</p>
        <p>This is the last statement</p>
      </VisualEssay>
    </Breakout>
  </DefaultLayout>
);

export default TestView;
