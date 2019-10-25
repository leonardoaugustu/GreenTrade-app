import React, { Component } from "react";
import { Text, View, Image, Button } from "react-native";
import { Icon } from "react-native-elements";
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
        <View style={{ justifyContent: 'center', flexDirection: 'row', bottom: '70%' }}>
          <Text>Points: 5</Text>
          <Image style={{ width: '50%', height: '50%' }} source={require("../../assets/logo.png")} />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{ width: '50%', height: '50%' }} source={require("../../assets/image.png")} />
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Text>Platic</Text>
          <Text>Bottle</Text>
          <Button title="Send"></Button>
        </View>
      </View>
    );
  }
}