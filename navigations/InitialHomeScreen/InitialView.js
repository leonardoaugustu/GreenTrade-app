import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Button} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import { Dialog } from 'react-native-simple-dialogs';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export default class InitialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
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