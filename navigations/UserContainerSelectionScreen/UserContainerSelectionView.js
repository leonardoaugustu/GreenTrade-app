import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import { Icon, Image } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import 'firebase/firestore';
//import Icon1 from 'react-native-vector-icons/FontAwesome';
//import firebaseConfig from '../../config/FireBaseConfig'
import firebase from '../../config/firebase'
import { Dropdown } from 'react-native-material-dropdown';

export default class UserContainerSelectionView extends Component 
{

    constructor(props) 
    {
        super(props);
        
        this.state = {containerData:[], dropdownNumbers:[], 
          purchaseTotal:0.00, numberOfContainers:0, isMaxAmount: false }
      }

      componentDidMount()
  {
    try
    {
      let dropDownData = [{
        value: 0,
      },{
        value: 1,
      }, {
        value: 2,
      }, {
        value: 3,
      },{
        value: 4,
      },{
        value: 5,
      }];
      this.setState({dropdownNumbers: dropDownData});      
      const newData=[]; 
      var db = firebase.firestore();

      db.collection("containers").get().then((querySnapshot) => 
      {
        querySnapshot.forEach((doc) => 
        {  
          var containerInfo =
              {
                "Name": doc.data().name,
                "Height": doc.data().height,
                "Description": doc.data().description,
                "Img_url": doc.data().img_url,
                "Length": doc.data().length,
                "Size" : doc.data().size,
                "Width" : doc.data().width,
                "Cost"  : doc.data().cost,
                "Quantity": 0
              };
              newData.push(containerInfo)
              this.setState({containerData: newData});
              //console.log(this.state.containerData);
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
    <Image source={{ uri: item.Img_url}} style={{ width: 75, height: 75 }}/>
    <Dropdown  style={{ flex: 1, width:'200%'}}
        value={this.state.dropdownNumbers}
        data={this.state.dropdownNumbers}
        value={this.state.quantity}
        onChangeText={(value)=> {

          this.state.containerData.find((o, i) => {
            if (o.Name === item.Name) {
              this.state.containerData[i].Quantity =value;
              //console.log(this.state.containerData[i].Quantity);
                return true; // stop searching
            }});
            
          var newValue=0;//this.state.purchaseTotal+item.Cost*value;
          var total=0;//this.state.numberOfContainers+value;

          this.state.containerData.forEach(function(entry) {
            total=total+entry.Quantity;
            newValue=newValue+entry.Quantity*entry.Cost;
            //newValue=newValue entry.
        });
          newValue=parseFloat(newValue).toFixed(2);
          this.setState({
          purchaseTotal: newValue, numberOfContainers:total
        });}}/>
        
      <Text style={{ flex: 1, fontSize: 18, textAlign: 'right',  textAlignVertical: "center" }}> {item.Name}{"\n"} Cost: ${parseFloat(item.Cost).toFixed(2)}</Text>      
    </View>
    </TouchableOpacity>
  );
  buttonPress()
  {
    //console.log(this.state.purchaseTotal);

    if (this.state.numberOfContainers<=10)
    {
      this.props.navigation.navigate("CollectorMap");
    }
    else
    {
      this.setState({isMaxAmount: true})
    }
  }
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
            <Text style={styles.textTitle}>Container</Text>

          </View>
        </View>
      </View>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 100 }}>Subtotal: CDN ${this.state.purchaseTotal}</Text>
      <View>


      </View>
        <View>
          {
        this.state.isMaxAmount ? <Text style= {{ color: 'red'}}>Can't order more than 10 containers </Text> : null
          }
        </View>
      <Button style={{ flex:1, width: 50, height: 10, alignHorizontal: 'center' }} title="Proceed To Checkout"
         onPress={() => {this.buttonPress() }}/>
      <FlatList
        data={this.state.containerData}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderItem}
        keyExtractor={item => item.Cost}
        extraData={this.state}
        removeClippedSubviews={false}
        //getItemLayout={this._itemLayout.bind(this)}
        style={{flex:1}}
      >
      </FlatList>
    </SafeAreaView>
  );
  }
}