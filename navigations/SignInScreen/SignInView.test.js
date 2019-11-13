import React from 'react';
import { shallow, mount } from 'enzyme';
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

// Check SignInView includes GreenTrade text
it('has a GreenTrade text ', () => {
  expect(wrapped.find("Text").first().props().children).toEqual('GreenTrade')
})

// Check SignInView includes Sign In With Google text
it('has a Sign In With Google text ', () => {
    expect(wrapped.find("Text").last().props().children).toEqual('Sign In With Google')
})
