import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import * as firebase from 'firebase';
import 'firebase/firestore';




class FlatListItem extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.index % 2 == 0 ? '#faf0e6' : '#deb887' }}>
        <Text style={{ flex: 1, fontSize: 18 }}>{this.props.item.Name}{"\n"}{this.props.item.Address}</Text>
        <Text style={{ flex: 1, textAlign: 'right', fontSize: 18 }}>{this.props.item.Date}{"\n"}{this.props.item.Time}</Text>
      </View>
    )
  }

}

var collectorData = [];

export default class CollectorPickupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getCollection() {
    var firebaseConfig =
    {
      apiKey: "AIzaSyDCYDJXD_KqhqALV1dyg3qmh83m2oUP4Qs",
      authDomain: "test-project-c55f5.firebaseapp.com",
      databaseURL: "https://test-project-c55f5.firebaseio.com",
      projectId: "test-project-c55f5",
      storageBucket: "test-project-c55f5.appspot.com",
      messagingSenderId: "560889480153",
      appId: "1:560889480153:web:5e8aa945c570aa8f130fc8",
      measurementId: "G-7EQZ7MRPGQ"
    };

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    db.collection('collector-confirmed-pickups').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        db.collection('users').doc(doc.data().userId).get().then(function (userDoc) {
          var pickupInfo =
          {
            "Name": userDoc.data().firstName + " " + userDoc.data().lastName,
            "Address": userDoc.data().address,
            "Date": doc.data().scheduledTime.substring(0, 10),
            "Time": doc.data().scheduledTime.substring(11)
          };
          collectorData.push(pickupInfo);
          console.log(collectorData);
        });
      })
    });
  }

  render() {
    this.getCollection();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Icon
                onPress={() => this.props.navigation.openDrawer()}
                type="material"
                name="menu"
                size={30}
                color="#fff"
                containerStyle={styles.drawerIcon}
              />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.textTitle}>COLLECTOR</Text>

            </View>

          </View>

        </View>
        <FlatList
          data={collectorData}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CollectorMap')}>
                <FlatListItem item={item} index={index}>
                </FlatListItem></TouchableOpacity>);
          }}
          updateCellsBatchingPeriod={2000}
        >
        </FlatList>
      </SafeAreaView>
    );
  }
}