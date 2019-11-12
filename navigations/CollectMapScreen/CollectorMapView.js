import React, { Component } from "react";
import { Text, View} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";

export default class CollectorMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleBack =() => {
    this.props.navigation.goBack(null);
}
  
  render() {
 
    return (
        <SafeAreaView style={styles.container}>
           <View style={styles.headerContainer}>
              <View style={styles.header}>
              <View style={styles.iconWrapper}>
              <Icon
          onPress={() => this.toggleBack()}
          type="material"
          name="keyboard-arrow-left"
          size={30}
          color="#fff"
          containerStyle={styles.drawerIcon}
        />
              </View>
              <View style={styles.titleWrapper}>
                  <Text style={styles.textTitle}>Pickup Location</Text>
              </View>
              </View>
          </View>
        </SafeAreaView>
    );
  }
}