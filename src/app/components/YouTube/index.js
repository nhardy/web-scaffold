// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadScript } from 'redux-scripts-manager';
import cx from 'classnames';
import { noop } from 'lodash-es';

import Spacer from 'app/components/Spacer';
import styles from './styles.styl';


type Props = {
  className: ?string,
  videoId: string,
  autoplay: boolean,
  onReady: null | () => void,
  onStateChange: null | (event: {}) => void,
  loadScript: (src: string, callbackName: string) => Promise<void>,
};

@connect(null, { loadScript })
export default class YouTube extends Component<Props, void> {
  static defaultProps = {
    autoplay: false,
    onReady: noop,
    onStateChange: noop,
  };

  componentDidMount() {
    this.props.loadScript('https://www.youtube.com/iframe_api', 'onYouTubeIframeAPIReady')
      .then(() => {
        const { videoId, autoplay } = this.props;
        this.player = new window.YT.Player(this._container, {
          videoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
          },
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange,
          },
        });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.player) return;

    if (prevProps.videoId !== this.props.videoId) {
      const method = this.props.autoplay ? 'loadVideoById' : 'cueVideoById';
      this.player && this.player[method](this.props.videoId);
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  onPlayerReady = () => {
    this.props.onReady();
  };

  onPlayerStateChange = (event) => {
    this.props.onStateChange(event);
  };

  _container: ?HTMLDivElement;

  render() {
    return (
      <div className={cx(styles.root, this.props.className)}>
        <Spacer className={styles.spacer} ratio={16 / 9} />
        <div className={styles.player} ref={ref => (this._container = ref)} />
      </div>
    );
  }
}
