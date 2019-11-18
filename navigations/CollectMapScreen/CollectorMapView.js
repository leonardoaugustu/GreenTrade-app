import React, { Component } from "react";
import { Text, View, SafeAreaView, Linking, Platform } from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import styles from "./styles";
import { Button } from 'react-native-elements';



export default class CollectorMapView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    }
    this._getLocationAsync();
  }
  static navigationOptions = {
    header: null
  }

  openMap = () => {


    const scheme = Platform.select({ ios: `maps:${this.state.region.latitude},${this.state.region.longitude}?q=`, android: `geo:${this.state.region.latitude},${this.state.region.longitude}?q=` });
    const destination = "43.642567" + "," + "-79.387054"
    const url = Platform.select({
      ios: `${scheme}${`${this.props.selected} Destination`}@${destination}`,
      android: `${scheme}${`${this.props.selected} Destination`}@${destination}`
    });

    Linking.openURL(url)
  }



_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
  let region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045,
  }
  this.setState({ region: region })
}
render() {
  return (
    <View style={styles.container}>





      <View style={{ flex: 1 }}>
        <MapView
          provider='google'
          showsMyLocationButton={true}
          initialRegion={this.state.region}
          showCompass={true}
          showUserLocation={true}
          rotateEnabled={true}
          style={styles.maps}
        />
      </View>
      <View style={styles.buttonView}>
        <Button

          titleStyle={{ color: 'white' }}

          title="Collect"
          onPress={() => this.openMap()}

        />
      </View>

    </View>


  )
}
}