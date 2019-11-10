import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import * as firebase from 'firebase';
import 'firebase/firestore';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig'


class FlatListItem extends Component {
  render() 
  {

    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.index % 2 == 0 ? '#90ee90' : '#AFE2FC' }}>
        <Icon1 name="circle-thin"   size={52}  color={"#000000"} />
        <Text style={{ flex: 1, fontSize: 18,  textAlignVertical: "center" }}> {this.props.item.Name}{"\n"} {this.props.item.Address}</Text>
        <Text style={{ flex: 1, textAlign: 'right', textAlignVertical: "center", fontSize: 18 }}>{this.props.item.Date} {"\n"}{this.props.item.Time} </Text>
        <Icon1 name="angle-right" size={50} color="#000000" />
        
      </View>
    )
  }

}

export default class CollectorPickupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectorData:[], newData:'', isLoaded: false,
    }
  }

  componentWillMount()
  {
    const newData=[];

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    db.collection("collector-confirmed-pickups").doc("u3").collection("user-confirmed-pickups").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => 
      {
           db.collection('users').doc(doc.data().UserId).get().then(function (userDoc) 
        {  
          var pickupInfo =
            {
              "Name": userDoc.data().firstName+ " " +userDoc.data().lastName,
              "Address": userDoc.data().address,
              "Date": doc.data().scheduledTime.substring(0,10),
              "Time": doc.data().scheduledTime.substring(11)
            };
          newData.push(pickupInfo);
        });
      });
      this.setState({collectorData: newData, isLoaded: true});
    });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#000000",
        }}
      />
    );
  };

  render()
   {
    if (!this.state.isLoaded)
    {
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
                <Text style={styles.textTitle}>Green Trade</Text>
  
              </View>
  
            </View>
            </View>
            <View>
     <Text >
       Pickup Schedule is Loading
     </Text>
   </View>
            </SafeAreaView>)
    }
    else
    {
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
              <Text style={styles.textTitle}>Green Trade</Text>

            </View>

          </View>

        </View>
        <FlatList
          data={this.state.collectorData}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CollectorMap')}>
                <FlatListItem item={item} index={index}>
                </FlatListItem></TouchableOpacity>);
          }}
          //updateCellsBatchingPeriod={2000}
        >
        </FlatList>
      </SafeAreaView>
    );
  }
}
}
