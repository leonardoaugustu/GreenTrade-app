import React from 'react';
import { shallow } from 'enzyme';
import Scheduling from './Scheduling';
import SafeAreaView from "react-native-safe-area-view";
import { Text, View, } from "react-native";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Scheduling />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 8 Views', () => {
  expect(wrapped.find(View).length).toEqual(8);
});

it('has 4 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(4);
});