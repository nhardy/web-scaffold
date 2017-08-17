// @flow
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import type { Node } from 'react';
import cx from 'classnames';

import { isScrolledIntoView } from 'app/lib/dom';
import throttle from 'app/lib/throttle';
import styles from './styles.styl';


type Props = {
  className?: string,
  children?: Node,
};

type State = {
  visible: boolean,
};

export default class P extends Component<Props, State> {
  state = {
    visible: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.update, { passive: true });
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.update, { passive: true });
    this.update.cancel();
  }

  update = throttle(() => {
    const visible = this._node ? isScrolledIntoView(this._node) : false;
    if (this.state.visible !== visible) {
      this.setState({
        visible,
      });
    }
  });

  _node: ?HTMLParagraphElement;

  render() {
    const { className, children, ...props } = this.props;
    return (
      <p className={cx(styles.root, { [styles.visible]: this.state.visible }, className)} ref={ref => (this._node = ref)} {...props}>
        {children}
      </p>
    );
  }
}
