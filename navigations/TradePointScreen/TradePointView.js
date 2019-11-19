import React, { Component } from "react";
import { Text, View, Image, Alert } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase'

export default class TradePointlView extends Component {
  constructor(props) {
    super(props); {
      this.state = {
        currentUserPoint: {},
      };
      try {
        const currentUser = firebase.auth().currentUser && firebase.auth().currentUser.displayName;
        var db = firebase.firestore();
        db.collection("users").where("displayName", "==", currentUser).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var uesrPoint = {
              point: doc.data().points
            };
            this.setState({ currentUserPoint: uesrPoint });
          });
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  updatePoint = (userPoint, point) => {
    var db = firebase.firestore();
    try {
      var diff = userPoint - point;
      if (diff >= 0) {
        console.log(diff)
        const currentUser = firebase.auth().currentUser;
        var user = db.collection("users").doc(currentUser.uid);
        user.get().then(
          user.update({
            points: diff
          }))
        try {
          const currentUser = firebase.auth().currentUser && firebase.auth().currentUser.displayName;
          db.collection("users").where("displayName", "==", currentUser).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var uesrPoint = {
                point: doc.data().points
              };
              this.setState({ currentUserPoint: uesrPoint });
            });
          });
        }
        catch (error) {
          console.log(error);
        }
        let code = Math.floor((Math.random() * 10000) + 1);
        Alert.alert(
          'Reward code is ' + code
        )
      }
      else {
        Alert.alert(
          'You need more points!'
        )
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigation } = this.props;
    const image = navigation.state.params.Img_url;
    const point = navigation.state.params.Cost;
    const user = firebase.auth().currentUser && firebase.auth().currentUser.displayName;
    var userPoint = this.state.currentUserPoint.point;
    return (

      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <Icon
                  onPress={() => this.props.navigation.goBack(null)}
                  type="material"
                  name="keyboard-arrow-left"
                  size={30}
                  color="#fff"
                  containerStyle={styles.drawerIcon}
                />
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.textTitle}>Redeem Rewards</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.userPoint}>
          <Button disabled={true} disabledStyle={{ backgroundColor: "white" }}
            disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
            title={user + ": " + userPoint}
          />
        </View>

        <View style={styles.rewardInfo}>
          <Image resizeMethod="resize" style={styles.img} source={{ uri: image }} />
        </View>

        <View style={styles.point}>
          <Button disabled={true} disabledStyle={{ backgroundColor: "white" }}
            disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
            title={point}
            icon={<Icon iconStyle={{ left: 10 }}
              type="font-awesome" name="star" color="#e1b225" />} />
        </View>

        <View style={styles.usePoint}>
          <Button buttonStyle={{ backgroundColor: "#da272a" }}
            titleStyle={{ color: "white", fontSize: 25 }}
            title="Use your point" iconRight={true}
            onPress={() => this.updatePoint(userPoint, point)} />
        </View>
      </View>
    );
  }
}