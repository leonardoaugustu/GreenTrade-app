import React from 'react';
import { shallow } from 'enzyme';
import PictureDetailView from './PictureDetailView';
import SafeAreaView from "react-native-safe-area-view";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<PictureDetailView />);
});

it('has SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});
