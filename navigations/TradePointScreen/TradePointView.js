import React, { Component } from "react";
import { Text, View, Image, } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";

export default class TradePointlView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

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

        <View style={styles.rewardInfo}>
          <Image style={styles.TimHorton} source={require("../../assets/timhorton.png")} />
        </View>

        <View style={styles.point}>
          <Button disabled={true} disabledStyle={{ backgroundColor: "white" }}
            disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
            title="50"
            icon={<Icon iconStyle={{ left: 10 }}
              type="font-awesome" name="star" color="#e1b225" />} />
        </View>

        <View style={styles.qrcode}>
          <Button buttonStyle={{ backgroundColor: "#da272a" }}
            titleStyle={{ color: "white", fontSize: 25 }}
            title="Scan to Redeem" iconRight={true}
            icon={<Icon iconStyle={{ left: 20 }}
              type="font-awesome" name="qrcode" />} />
        </View>

        <View style={styles.scanQrcode}>
          <Icon iconStyle={{ left: 10 }}
            type="font-awesome" name="qrcode" color="black" size={200} />
        </View>
      </View>
    );
  }
}