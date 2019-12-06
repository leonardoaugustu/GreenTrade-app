import React from 'react';
import { shallow } from 'enzyme';
import HomeView from './HomeView';
import SafeAreaView from "react-native-safe-area-view";
import {
	Text,
	View,
} from 'react-native';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<HomeView />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 13 Views', () => {
  expect(wrapped.find(View).length).toEqual(13);
});

it('has 8 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(8);
});