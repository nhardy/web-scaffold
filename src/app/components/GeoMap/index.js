// @flow

/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import geojson2svg from 'geojson2svg';
import { get, groupBy } from 'lodash-es';

import styles from './styles.styl';


type Props = {
  data: {
    features: Array<{}>,
  },
  colors: {
    cargill: string,
  },
  onClickRegion: (region: string) => void,
};

type State = {};

export default class GeoMap extends Component<Props, State> {
  componentDidMount() {

  }

  onClick = (region: string) => {
    this.props.onClickRegion(region);
  };

  render() {
    const { data, colors } = this.props;
    const converter = geojson2svg({
      viewportSize: {
        height: 512,
        width: 512,
      },
      mapExtent: {
        left: 1346000,
        right: 1425420,
        bottom: 4896000,
        top: 4987950,
      },
      output: 'path',
    });
    // $FlowFixMe
    const regions: Array<[string, Array<{ geometry: any }>]> = Object.entries(groupBy(data.features, 'properties.dn_ql'));

    return (
      <div className={styles.root}>
        <svg className={styles.map} viewBox="0 0 512 512">
          <defs>
            {regions.map(([region]) => (
              <filter key={region} id={`${region}-outline`}>
                <feMorphology operator="dilate" in="SourceAlpha" radius={1} />
                <feComposite in="SourceGraphic" />
              </filter>
            ))}
          </defs>
          {regions.map(([region, features]) => (
            <g key={region} className={styles.region} style={{ fill: get(colors, [region]) }} filter={`url(#${region}-outline)`} onClick={() => this.onClick(region)}>
              {features.map((feature, index) => (
                <path key={index} d={converter.convert(feature.geometry)} />
              ))}
            </g>
          ))}
        </svg>
      </div>
    );
  }
}
