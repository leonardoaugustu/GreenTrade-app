import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Button, TouchableHighlight} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import { Dialog } from 'react-native-simple-dialogs';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Wave from 'react-native-waveview';
import firebase from '../../config/firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class InitialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      height: null,
      totalPoint: null,
      maxPoint: 1000,
      percentage: null
    };
  }

  toggleCamera = () => {
    this.setState({dialogVisible: true})
  }
  _canceltoggle = () => {
    this.setState({dialogVisible: false})
  }

  async componentDidMount() {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    try{
      var db = firebase.firestore();

  
      db.collection("recycled-items").get().then((querySnapshot) => {
        var sum = 0;
        var p = 0;
        querySnapshot.forEach((doc) => 
        {

          if (doc.data().userId==firebase.auth().currentUser.uid)
          {   
        sum = sum + doc.data().estimatedPoints;
        p = sum / this.state.maxPoint;
        h = p* wp('40%');
        //console.log(this.state.name + "is showing")
        this.setState({totalPoint: sum, percentage: p, height: h});
        console.log(this.state.totalPoint)
            }
          });
        });
        console.log(this.state.totalPoint)
    }
    catch (error){
      console.log(error);
    }
    this.forceUpdate();
  }

  componentWillMount(){
    this._waveRect.setWaterHeight(this.state.height);
  }
  
  _takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
  };

  render() {
 
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
          <View style={styles.waveContainer} >
    {/* <TouchableHighlight onPress={()=>{
        // Stop Animation
 
        // set water baseline height
        this._waveRect && this._waveRect.setWaterHeight(70);
 
        // reset wave effect
        this._waveRect && this._waveRect.setWaveParams([
            {A: 10, T: 260, fill: '#FF9F2E'},
            {A: 15, T: 220, fill: '#F08200'},
            {A: 20, T: 180, fill: '#B36100'},
        ]);
    }}> */}
    <Wave
        ref={ref=>this._waveRect = ref}
        style={styles.waveBall}
        H={this.state.height}
        waveParams={[
            {A: 10, T: 260, fill: '#62c2ff'},
            {A: 15, T: 220, fill: '#0087dc'},
            {A: 20, T: 180, fill: '#1aa7ff'},
        ]}
        animated={true}
    />
  <Text>{this.state.percentage * 100} %</Text>
    {/* </TouchableHighlight> */}
</View>
          <TouchableOpacity onPress={this.toggleCamera}>
          <View style={styles.cameraWrapper}>
          <Image style={styles.cameraImg} source={require('../../assets/camera.png')}/>
          </View>
          </TouchableOpacity>
          <View style={styles.dialogContainer}>
                <Dialog
                dialogStyle ={styles.dialog}
                   visible={this.state.dialogVisible}
                   >
                       <View style={styles.customDialog}>
                       <Button
							onPress={this._pickImage}
							title="Choose from camera roll"
						/>
						<Button onPress={this._takePhoto} title="Take a photo" />
            <Button onPress={this._canceltoggle} title="Cancel" />
                       </View>
                </Dialog>
                </View>
        </SafeAreaView>
    );
  }
}

