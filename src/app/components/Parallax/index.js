// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import { noop } from 'lodash-es';

import throttle from 'app/lib/throttle';
import { isScrolledIntoView } from 'app/lib/dom';
import styles from './styles.styl';


type Props = {
  className: ?string,
  children: Node,
  componentRef: (?HTMLDivElement) => void,
  src: string,
  srcSet: ?string,
  sizes: ?string,
  alt: string,
};

type State = {
  style: {
    perspectiveOrigin: string,
  },
};

const EVENTS = [
  'scroll',
  'resize',
];

export default class Parallax extends Component<Props, State> {
  static defaultProps = {
    componentRef: noop,
  };

  state = {
    style: {
      perspectiveOrigin: 'center 0px',
    },
  };

  componentDidMount() {
    this.update();
    EVENTS.forEach(event => window.addEventListener(event, this.update));
  }

  componentWillUnmount() {
    EVENTS.forEach(event => window.removeEventListener(event, this.update));
    this.update.cancel();
  }

  setRef = (ref: ?HTMLDivElement) => {
    this._node = ref;
    this.props.componentRef(ref);
  };

  _node: ?HTMLDivElement;

  update = throttle(() => {
    if (!this._node || !isScrolledIntoView(this._node)) return;

    const perspectiveOrigin = `center ${window.scrollY}px`;
    this.setState({ style: { perspectiveOrigin } });
  });

  render() {
    const { className, children, src, srcSet, sizes, alt } = this.props;
    return (
      <div ref={ref => this.setRef(ref)} className={cx(styles.root, className)} style={this.state.style}>
        <img className={styles.background} src={src} srcSet={srcSet} sizes={sizes} alt={alt} />
        <div className={styles.foreground}>
          {children}
        </div>
      </div>
    );
  }
}
