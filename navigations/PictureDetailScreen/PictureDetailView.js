import React, { Component } from "react";
import { Text, View, Image, } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase'

export default class PictureDetailView extends Component {
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
            var uesrInfo = {
              point: doc.data().points
            };
            this.setState({ currentUserPoint: uesrInfo });
          });
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const user = firebase.auth().currentUser && firebase.auth().currentUser.displayName;
    var userPoint = this.state.currentUserPoint.point;

    return (
      <View style={styles.container}>
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
                <Text style={styles.textTitle}>Picture Detail</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.pictureDetailContainer}>
        <View style={styles.userPoint}>
            <Button disabled={true} disabledStyle={{ backgroundColor: "white" }}
              disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
              title={"Total Points and Image"}
            />
          </View>
          <View style={styles.userPoint}>
            <Button disabled={true} disabledStyle={{ backgroundColor: "white" }}
              disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
              title={user + ": " + userPoint + "points"}
            />
          </View>
          <View style={styles.rewardInfo}>
            <Image resizeMethod="resize" style={styles.img} source={{ uri: "https://www.schoellerallibert.co.uk/mm5/graphics/00000008/EuroClick%20Plastic%20Stacking%20Container%20-%2062%20Litre_450x352.jpg" }} />
          </View>

          <View style={styles.materials}>
            <Text style={styles.Txt_h3}>Platic (from ML Not finished)</Text>
          </View>
          {/* <View style={styles.button}>
            <Button buttonStyle={styles.buttonSize} title="-"></Button>
          </View> */}
        </View>
      </View>
    );
  }
}