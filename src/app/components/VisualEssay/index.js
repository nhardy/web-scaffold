// @flow

import React, { Children, Component } from 'react';
import type { ComponentType, Node } from 'react';
import cx from 'classnames';
import { range, find } from 'lodash-es';

import { isScrolledIntoView } from 'app/lib/dom';
import throttle from 'app/lib/throttle';
import styles from './styles.styl';


type StationaryProps = {
  index: number,
};

type Props = {
  className: string,
  Stationary: ComponentType<StationaryProps>,
  children: Node,
};

type Position = -1 | 0 | 1;

type State = {
  position: Position,
  index: number,
};

export default class VisualEssay extends Component<Props, State> {
  state = {
    position: -1,
    index: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll.cancel();
  }

  getPosition = (node: HTMLDivElement) => {
    const { top, bottom } = node.getBoundingClientRect();
    if (top > 0) return -1;
    if (bottom < window.innerHeight) return 1;
    return 0;
  };

  getIndex = () => {
    const length = Children.count(this.props.children);
    const found = find(range(length), (i) => {
      if (!this._slides[i]) return false;
      const { bottom } = this._slides[i].getBoundingClientRect();
      return bottom > window.innerHeight / 2;
    });

    return found === undefined ? length - 1 : found;
  };

  setSlideRef = (index: number, ref: ?HTMLDivElement) => {
    // $FlowFixMe
    this._slides[index] = ref;
  };

  _node: ?HTMLDivElement;

  _slides: { [index: string]: ?HTMLDivElement } = {};

  update = () => {
    if (this._node && (this.state.position === 0 || isScrolledIntoView(this._node))) {
      this.setState({
        position: this.getPosition(this._node),
        index: this.getIndex(),
      });
    }
  };

  // eslint-disable-next-line react/sort-comp
  onScroll = throttle(this.update);

  render() {
    const { className, Stationary, children } = this.props;
    const { position, index } = this.state;

    return (
      <div className={cx(styles.root, className)} ref={ref => (this._node = ref)}>
        <div
          className={cx(styles.stationary, {
            [styles.top]: position === -1,
            [styles.fixed]: position === 0,
            [styles.bottom]: position === 1,
          })}
        >
          <Stationary index={index} />
        </div>
        <div className={cx(styles.slides)}>
          {Children.map(children, (child, i) => (
            <div className={styles.slide} ref={ref => this.setSlideRef(i, ref)}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
