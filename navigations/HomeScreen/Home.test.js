import React from 'react';
import { shallow } from 'enzyme';
import HomeView from './HomeView';
import SafeAreaView from "react-native-safe-area-view";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<HomeView />);
});

it('has SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});
