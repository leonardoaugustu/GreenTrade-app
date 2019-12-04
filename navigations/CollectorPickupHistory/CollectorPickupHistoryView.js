import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import { Icon, Image } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import 'firebase/firestore';
//import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig'
import firebase from '../../config/firebase'
import { Dropdown } from 'react-native-material-dropdown';

export default class CollectorPickupHistoryView extends Component 
{
    constructor(props) 
    {
        super(props);
        
        this.state = {collectorHistoryData:[] }
      }

      componentDidMount()
      {
        try{
          const newData=[]; 
          var db = firebase.firestore();
    
      
          db.collection("completed-pickups").doc(firebase.auth().currentUser.uid).collection("pickups").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => 
            {

                var historyInfo =
                  {
                    "Url": doc.data().url,
                    "Timestamp": doc.data().time
                  };
                newData.push(historyInfo);
              this.setState({collectorHistoryData: newData});
              //console.log(this.state.collectorHistoryData);
              //console.log(firebase.auth().currentUser.uid)
            });
          });
        }
        catch (error){
          console.log(error);
        }
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
      renderItem = ({ item}) => (
        <TouchableOpacity >
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image source={{ uri: item.Url}} style={styles.imgContainer}/>

          <Text style={{ flex: 1, fontSize: 18, textAlign: 'right',  textAlignVertical: "center" }}>Date: {item.Timestamp}</Text>      
        </View>
        </TouchableOpacity>
      );

      render()
      {
        return(
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
                <Text style={styles.textTitle}>Pickup History</Text>
    
              </View>
            </View>
          </View>
          <FlatList
        data={this.state.collectorHistoryData}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderItem}
       keyExtractor={item => item.Url}
        extraData={this.state}
        removeClippedSubviews={false}
        style={{flex:1}}
      >
      </FlatList>
        </SafeAreaView>
      );
      }
}