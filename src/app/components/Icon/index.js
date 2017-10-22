// @flow

import React from 'react';
import cx from 'classnames';

import styles from './styles.styl';


// eslint-disable-next-line react/require-default-props
const Icon = ({ name, className, image = false, ...props }: { name: string, className?: string, image?: boolean }) => {
  let Svg;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    Svg = require(`app/assets/images/icons/${name}.icon.svg`).default;
  } catch (e) {
    Svg = null;
  }

  return Svg ? (
    <Svg className={cx(styles.root, { [styles.icon]: !image }, className)} {...props} />
  ) : null;
};

export default Icon;
