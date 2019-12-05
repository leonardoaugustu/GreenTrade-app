import React from 'react';
import { shallow } from 'enzyme';
import CollectorPickupView from './CollectorPickupView';
import { Text, View, Button, SafeAreaView} from "react-native";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<CollectorPickupView />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 6 Views', () => {
  expect(wrapped.find(View).length).toEqual(6);
});

it('has 2 Buttons', () => {
  expect(wrapped.find(Button).length).toEqual(2);
});

it('has 6 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(6);
});
