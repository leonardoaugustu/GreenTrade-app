import React from 'react';
import { shallow } from 'enzyme';

import CollectorMapView from './CollectorMapView';
import { Text, View, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<CollectorMapView />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 7 Views', () => {
  expect(wrapped.find(View).length).toEqual(7);
});

it('has 1 Button', () => {
  expect(wrapped.find(Button).length).toEqual(1);
});

it('has 1 Text', () => {
  expect(wrapped.find(Text).length).toEqual(1);
});

// Check CollectorMapView includes Confirmed Pickups text
it('has a Confirmed Pickups text ', () => {
  expect(wrapped.find("Text").last().props().children).toEqual('Confirmed Pickups')
})