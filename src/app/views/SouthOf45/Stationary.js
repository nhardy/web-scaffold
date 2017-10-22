import React, { Component } from 'react';
import { connect } from 'react-redux';

import GeoMap from 'app/components/GeoMap';
import styles from './styles.styl';


type Props = {
  index: number,
  dunedinGeoJson: {},
};

@connect(state => ({
  dunedinGeoJson: state.govhack.dunedinGeoJson.data,
}))
export default class Stationary extends Component<Props, void> {
  render() {
    const { index, dunedinGeoJson } = this.props;
    const colors = {
      1: {
        cargill: '#f8b617',
      },
    }[index];

    return (
      <div className={styles.stationary}>
        <GeoMap data={dunedinGeoJson} colors={colors} />
      </div>
    );
  }
}
