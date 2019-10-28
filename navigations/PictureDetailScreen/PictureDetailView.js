import React, { Component } from "react";
import { Text, View, Image, } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";

export default class PictureDetailView extends Component {
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
          <View style={styles.logo}>
            <Image style={styles.logoIcon} source={require("../../assets/logo.png")} />
          </View>
          <View style={styles.points}>
            <Text style={styles.Txt_h2}>Points: ??</Text>
          </View>
          <View style={styles.image}>
            <Image style={styles.imageIcon} source={require("../../assets/image.png")} />
          </View>
          <View style={styles.materials}>
            <Text style={styles.Txt_h3}>Platic</Text>
            <Text style={styles.Txt_h3}>Bottle</Text>
          </View>
          <View style={styles.button}>
            <Button buttonStyle={styles.buttonSize} title="Send"></Button>
          </View>
        </View>
      </View>
    );
  }
}