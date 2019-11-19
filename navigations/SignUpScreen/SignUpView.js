import React, { Component } from "react";
import { SafeAreaView, Image, Text, View, TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { SegmentedControls } from 'react-native-radio-buttons'
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import styles from "./styles";
import * as Google from 'expo-google-app-auth';
import googleLogInConfig from '../../config/OAuthClientConfig';
import 'firebase/firestore';
import firebase from '../../config/firebase'

const options = [
  "Member",
  "Collector"
];

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: '',
      selectedOption: 'Member',
      successDialogVisible: false      
    };
  }

  //sign up using email and password
  onEmailSignUp = async () => {
    this.setState({
      loading: true,
      error: ''
    });
    const { email, password } = this.state;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({
          loading: false,
          user,
          error: '',
        });
        console.log('>>> save: ' + JSON.stringify(user)); 

        var userData = {
          uid: user.user.uid,
          providerId: user.user.providerData[0].providerId,
          email: user.user.providerData[0].email,
          displayName: user.user.displayName,
          firstName: user.additionalUserInfo.profile.given_name,
          lastName: user.additionalUserInfo.profile.family_name,
          profilePhoto: user.user.photoURL
        }
        this.saveGoogleUser(userData);
        showSuccessDialog();
      })
      .catch((error) => {
        console.info(error.message);
        this.setState({ loading: false, error: error.message });
      });
  };
  //save google user to firestore db
  saveGoogleUser = (userData) => {
    const db = firebase.firestore();
    var user = db.collection("users").doc(userData.uid);
    user.get().then(doc => {
      //update
      if (doc.exists) {
        user.update({
          lastLoginAt: Date.now()
        }).then(function (snapshot) {
          console.log('Updated Snapshot', snapshot);
        });
      }
      //insert
      else {
        userData.type = 'member';
        userData.deleted = false;
        userData.points = 0;
        userData.codes = [];
        userData.containers = [];
        userData.pickups = [];

        user.set(userData)
          .then(function (snapshot) {
            console.log('Inserted Snapshot', snapshot);
          });
      }
    });
  };
  onCancel = () => {
    this.props.navigation.goBack();
  }
  showSuccessDialog = () => {
    this.setState({ successDialogVisible: true })
  }
  renderCurrentState() {
    if (this.state.loading) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    if (firebase.auth().currentUser !== null) {
      return (
        <View style={styles.form}>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.containerView}>

        <KeyboardAvoidingView style={styles.containerView} keyboardVerticalOffset={100} behavior="padding"> 
          <ScrollView>

            <View>
              <Text style={styles.logoText}>Sign Up</Text>
              <Text style={styles.ErrorTextStyle}>{this.state.error}</Text>
              <TextInput placeholder="Enter Email" textContentType="emailAddress" keyboardType="email-address" autoCompleteType="email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} autofocus
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput placeholder="Enter Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <View style={styles.SegmentedStyleBox}>
                <SegmentedControls
                  options={options}
                  onSelection={selectedOption => this.setState({selectedOption})}
                  selectedOption={this.state.selectedOption}
                />
              </View>
              <TextInput placeholder="First Name" textContentType="givenName" autoCompleteType="name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
              />
              <TextInput placeholder="Last Name" textContentType="familyName" autoCompleteType="name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
              />
              <TextInput placeholder="Address" textContentType="fullStreetAddress" autoCompleteType="street-address" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
              />
              <TextInput placeholder="City" textContentType="addressCity" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={city => this.setState({ city })}
                value={this.state.city}
              />
              <TextInput placeholder="Province" textContentType="addressState" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={province => this.setState({ province })}
                value={this.state.province}
              />
              <TextInput placeholder="Postal Code" textContentType="postalCode" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                onChangeText={postalCode => this.setState({ postalCode })}
                value={this.state.postalCode}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onEmailSignUp()}
                title="Register"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onCancel()}
                title="Cancel"
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        <ConfirmDialog
          title="Welcome"
          titleStyle={styles.centeredText}
          visible={this.state.successDialogVisible}
          animationType='fade'
          onTouchOutside={() => this.props.navigation.goBack()}
          positiveButton={{
            title: "OK",
            onPress: () => this.props.navigation.goBack()
          }} >
          <View style={styles.centeredItems}>
            <Image style={styles.successImage} source={require('../../assets/success-icon.jpg')} />
            <Text style={styles.dialogMessage}>Your registration has been successfully processed.</Text>
          </View>
        </ConfirmDialog>

      </SafeAreaView>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}
