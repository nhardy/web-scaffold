import React from 'react';
import type { Node } from 'react';

import styles from './styles.styl';


const Breakout = ({ children }: { children: Node }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      {children}
    </div>
  </div>
);

export default Breakout;
