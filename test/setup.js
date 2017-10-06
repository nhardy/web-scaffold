// @flow

import path from 'path';
import { addPath } from 'app-module-path';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import pq from 'proxyquire';

import './setupJsDom';
import type { StubsType } from './flowTypes';


addPath(path.resolve(__dirname, '..', 'src'));
addPath(path.resolve(__dirname, '.'));

enzyme.configure({ adapter: new Adapter() });

global.expect = chai.expect;
global.sinon = sinon;

chai.use(chaiEnzyme());

global.proxyquire = (modulePath: string, stubs: StubsType = {}) => {
  pq.noCallThru();
  return pq(modulePath, stubs);
};

global.__SERVER__ = true;
global.__CLIENT__ = false;
global.__DEVELOPMENT__ = false;

// eslint-disable-next-line import/no-commonjs
require('./setupJsDom');

