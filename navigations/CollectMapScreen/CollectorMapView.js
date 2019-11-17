import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { Icon } from "react-native-elements";
import styles from "./styles";

export default class CollectorMapView extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      region: null,
    }
    this._getLocationAsync();
  }
  static navigationOptions = {
  header: null
}

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }
    this.setState({region: region})
  }
  render() {
    return (
      <View style={styles.container}>
           

        <MapView
        provider='google'
        showsMyLocationButton={true}
        initialRegion={this.state.region}
        showCompass={true}
        showUserLocation={true}
        rotateEnabled={true}
        style={{flex: 1}}/>

        
      </View>
      
      
    )
    }
  }