import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import { Dialog } from 'react-native-simple-dialogs';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Wave from 'react-native-waveview';
import firebase from '../../config/firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {getPoints} from '../../actions/Payment/actionCreators';


class InitialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      height: 0,
      totalPoint: 0,
      maxPoint: 1000,
      percentage: null,
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
        this.props.points = this.props.points + doc.data().estimatedPoints;
        p = sum / this.state.maxPoint;
        h = p* wp('40%');
        //console.log(this.state.name + "is showing")
        this.setState({totalPoint: sum, percentage: p, height: h});
        console.log(this.props.points)
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

	_handleImagePicked = async pickerResult => {
		try {
			this.setState({ uploading: true });

			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
				this.setState({ image: uploadUrl });
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed, sorry :(');
		} finally {
			this.setState({ uploading: false });
		}
	};

  render() {
    var height = this.state.height;
 
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
          {/* {this.state.height != 0 ? (  */}
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
        ref={(wave) => wave && wave.setWaterHeight(this.props.points/this.state.maxPoint * wp('40%'))}
        style={styles.waveBall}
        H={this.props.points/this.state.maxPoint * wp('40%')}
        waveParams={[
            {A: 10, T: 260, fill: '#62c2ff'},
            {A: 15, T: 220, fill: '#0087dc'},
            {A: 20, T: 180, fill: '#1aa7ff'},
        ]}
        animated={true}
    />
  <Text style={styles.perText}>{this.props.points/this.state.maxPoint * 100} %</Text>
    {/* </TouchableHighlight> */}
</View>
 {/* ) : <ActivityIndicator />} */}
 </View>
 <View style={styles.cameraWrapper}>
          <TouchableOpacity onPress={this.toggleCamera} style={styles.cameraImg}>
          
          <Image style={styles.cameraImg} source={require('../../assets/camera.png')}/>
          
          </TouchableOpacity>
          </View>
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

function mapStateToProps (state){
  return{
    points: state.getPointsReducer.points,
  }; 
}

function mapDispatchToProps (dispatch)  {
  return {
      getPoints: (points) => dispatch(getPoints(points)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialView);

