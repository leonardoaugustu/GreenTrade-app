import React from 'react';
import { shallow } from 'enzyme';
import SignInView from './SignInView';
import SafeAreaView from "react-native-safe-area-view";
import { KeyboardAvoidingView } from 'react-native';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<SignInView />);
});

it('has Keyboard Avoiding View', () => {
  expect(wrapped.find(KeyboardAvoidingView).length).toEqual(1);
});
