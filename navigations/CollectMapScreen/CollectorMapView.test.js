import React from 'react';
import { shallow } from 'enzyme';

import CollectorMapView from './CollectorMapView';
import SafeAreaView from 'react-native-safe-area-view';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<CollectorMapView />);
});

it('has SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});