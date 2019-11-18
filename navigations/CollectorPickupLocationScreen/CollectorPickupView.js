import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";

import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import 'firebase/firestore';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig'
import firebase from '../../config/firebase'

export default class CollectorPickupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectorData:[], 
      name: "",
      address: "",
    }
  }

  componentDidMount()
  {
    try{
      const newData=[]; 
      var db = firebase.firestore();

  
      db.collection("collector-confirmed-pickups").doc("u3").collection("user-confirmed-pickups").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => 
        {
             db.collection('users').doc(doc.data().UserId).get().then((userDoc) =>
          {  
            var pickupInfo =
              {
                "Name": userDoc.data().firstName+ " " +userDoc.data().lastName,
                "Address": userDoc.data().address,
                "Date": doc.data().scheduledTime.substring(0,10),
                "Time": doc.data().scheduledTime.substring(11),
                "UserId": doc.data().UserId
              };
            newData.push(pickupInfo);
          this.setState({collectorData: newData});
          });
          
        });
      });
    }
    catch (error){
      console.log(error);
    }
  }

  toggleMap =() =>{
    this.props.navigation.navigate("CollectorMap");
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

  _itemLayout(data, index) {
    const width = this._itemWidth()

    return {
      length: width,
      offset: width * index,
      index,
    };
  }

  _itemWidth() {
    const { width } = Dimensions.get("window");
    return width;
  }

  renderItem = ({ item}) => (
    <TouchableOpacity onPress={() => {
      this.props.currentUser(item.Name);
      this.toggleMap()
      }}>
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.index % 2 == 0 ? '#90ee90' : '#AFE2FC' }}>
      <Icon1 name="circle-thin"   size={52}  color={"#000000"} />
      <Text style={{ flex: 1, fontSize: 18,  textAlignVertical: "center" }}> {item.Name}{"\n"} {item.Address}</Text>
      <Text style={{ flex: 1, textAlign: 'right', textAlignVertical: "center", fontSize: 18 }}>{item.Date} {"\n"}{item.Time} </Text>
      <Icon1 name="angle-right" size={50} color="#000000" />
      
    </View>
    </TouchableOpacity>
  );

  render()
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
              <Text style={styles.textTitle}>Confirmed Pickup</Text>

            </View>

          </View>

        </View>
        <FlatList
          data={this.state.collectorData}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.UserId}
          extraData={this.state}
          removeClippedSubviews={false}
          getItemLayout={this._itemLayout.bind(this)}
          style={{flex:1}}
        >
        </FlatList>
      </SafeAreaView>
    );
  }
}
