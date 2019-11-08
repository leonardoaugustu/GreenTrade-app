import React, { Component } from "react";
import {Keyboard, Text, View, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import styles from "./styles";

import * as Google from 'expo-google-app-auth';
import googleLogInConfig from '../../config/OAuthClientConfig';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../../config/FireBaseConfig'
firebase.initializeApp(firebaseConfig); 
const db = firebase.firestore();

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticating: false,
      error: '',
      };
  }
  signInWithGoogleAsync = async () => {
    try {
      console.info('signInWithGoogleAsync()');
      this.setState({authenticating: true});
      const result = await Google.logInAsync(googleLogInConfig).catch(e=> {this.setState({error: e.message}); return e;});

      if (result.type === 'success') {
        this.onGoogleSignIn(result);
        this.setState({error: ''});
        return result.accessToken;
      } else {
        this.setState({authenticating: false});
      return { cancelled: true };
      }
    } catch (e) {
      console.error(e.message);
      this.setState({authenticating: false});
      return { error: true };
    }
  };
  onGoogleSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(user => {
              console.log('User signed in'); 
              var userData = {
                uid: user.user.uid,
                providerId: user.user.providerData[0].providerId,
                email: user.user.providerData[0].email,
                displayName: user.user.displayName,
                firstName: user.additionalUserInfo.profile.given_name,
                lastName: user.additionalUserInfo.profile.family_name,
                profilePhoto: user.user.photoURL,
                type: 'member',
                deleted: false,
                points: 0,
                codes: [],
                containers: [],
                pickups: []
              }
              this.saveUser(userData);
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              console.info(error.message);
              this.setState({
                error: error.message
              });
            });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  //sign in using email and password
  onEmailSignIn = () => {
    this.setState({
      authenticating: true,
      error: ''
    });
    const { email, password } = this.state;
    const provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({
          authenticating: false,
          user,
          error: '',
        });
      })
      .catch((error) => {
          console.info(error.message);
          this.setState({authenticating: false, error: error.message });
      });
  };
  //save user to firestore db
  saveUser = (userData) => {
    var user = db.collection("users").doc(userData.uid);
    user.get().then(doc => {
      if (doc.exists) {
        user.update({
          lastLoginAt: Date.now()
        }).then(function (snapshot) {
          console.log('Updated Snapshot', snapshot);
        });
      }
      else {
        user.set(userData)
          .then(function (snapshot) {
            console.log('Inserted Snapshot', snapshot);
          });
      }
    });
  };
  renderCurrentState() {
    if (this.state.authenticating) {
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
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>GreenTrade</Text>
            <TextInput placeholder="Email" textContentType="emailAddress" keyboardType="email-address" autoCompleteType="email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Text style={styles.ErrorTextStyle}>{this.state.error}</Text>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onEmailSignIn()}
              title="Login"
            />
            <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}  style={styles.GooglePlusStyle} activeOpacity={0.5}>
              <Image
                source={require('../../assets/google.png')}
                style={styles.ImageIconStyle}
              />
              <View style={styles.SeparatorLine} />
              <Text style={styles.TextStyle}>Sign In With Google</Text>
            </TouchableOpacity>            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
