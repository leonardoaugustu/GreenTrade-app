import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity,Dimensions, SafeAreaView} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
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
      date:"",
      userSelected: false,
      warning: false,
      message:"Please select a user from the list"
    }
  }

  componentDidMount()
  {
    try{
      const newData=[]; 
      var db = firebase.firestore();

  
      db.collection("pickups").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => 
        {
          if (doc.data().collectorid==firebase.auth().currentUser.uid && doc.data().fulfilledAt==null && doc.data().useraddressDetailsstreet!=null)
          {
            
            var pickupInfo =
              {
                "Name": doc.data().customerName,
                "Address": doc.data().useraddressDetailsstreet,
                "Date": doc.data().scheduledtime,
                "UserId": doc.data().user
              };
            newData.push(pickupInfo);
          //console.log(this.state.name + "is showing")
          this.setState({collectorData: newData});
          //console.log(this.state.collectorData)
            }
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
  toggleCamera =() =>{
    this.props.navigation.navigate("CollectorML");

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
  takePictureButtonPress()
  {
    if (this.state.userSelected==false)
    {
      this.setState({warning:true});
    }
    else
    {
    this.toggleCamera()
    }
  }
  mapButtonPress()
  {
    if (this.state.userSelected==false)
    {
      this.setState({warning:true});
    }
    else
    {
    this.toggleMap()
    }
  }
  renderItem = ({ item}) => (
    <TouchableOpacity onPress={() => {
      this.props.currentUser(item.Name);
      //this.toggleMap()
      this.setState({name: item.Name, address: item.Address, date: item.Date, userSelected: true});
      }}>
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#AFE2FC' }}>
      <Icon1 name="circle-thin"   size={52}  color={"#000000"} />
      <Text style={{ flex: 1, fontSize: 18,  textAlignVertical: "center" }}> {item.Name}{"\n"} {item.Address}</Text>
      <Text style={{ flex: 1, textAlign: 'right', textAlignVertical: "center", fontSize: 18 }}>{item.Date}</Text>
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
           <Text style={styles.textTitle}>Confirmed Pickups</Text>

         </View>

       </View>

     </View>
     
     <Text style={{ fontSize: 18, textAlign: 'left' }}>Name: {this.state.name}</Text>
       <Text style={{ fontSize: 18, textAlign: 'left' }}>Address: {this.state.address}</Text>
       <Text style={{ fontSize: 18, textAlign: 'left' }}>Date: {this.state.date}</Text>
       <View>
          {
        this.state.warning ? <Text style= {{ color: 'red'}}>{this.state.message} </Text> : null
          }
        </View>
     <View style={{ flexDirection: 'column', alignItem: 'right', marginTop: 10 }}>
     <Text style={{ fontSize: 18, textAlign: 'center' }}>Find Pickup Location</Text>
     <Button style={{  width: 112, height: 2 }} title="View Map"
         onPress={() => {this.mapButtonPress() }}/>
         <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Take Photo of Customers Recyclables</Text>
      <Button style={{ width: 12, height: 2, marginBottom: 10}} title="Take Picture"
         onPress={() => {this.takePictureButtonPress() }}/>
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
