import React, { Component } from "react";
import {
  ActivityIndicator,
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';

import * as Permissions from 'expo-permissions'; 
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import Environment from '../../config/FireBaseConfig';
import firebase	 from '../../config/firebase';

export default class HomeView extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    image: null,
    uploading: false,
	googleResponse: null
  };
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }


  render() {
    let { image } = this.state;
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
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            {image ? null : (
              <Text style={styles.getStartedText}>Find your Recycle Item</Text>
            )}
          </View>

          <View style={styles.helpContainer}>
            <Button
              onPress={this._pickImage}
              title="Pick an image from camera roll"
            />

            <Button style={styles.takePhoto} onPress={this._takePhoto} title="Take a photo" />
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
          </View>
        </ScrollView>

      </SafeAreaView>
    );
  }
  organize = array =>{
    return array.map(function(item, i) {
      return(
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };
  _maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
  };
  _maybeRenderImage = () => {
		let { image, googleResponse } = this.state;
		if (!image) {
			return;
		}

		return (
			<View
				style={{
					marginTop: 20,
					width: 250,
					borderRadius: 3,
					elevation: 2
				}}
			>
				<Button
					style={{ marginBottom: 10 }}
					onPress={() => this.submitToGoogle()}
					title="Analyze!"
				/>

				<View
					style={{
						borderTopRightRadius: 3,
						borderTopLeftRadius: 3,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
						overflow: 'hidden'
					}}
				>
					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
				</View>
				<Text
					onPress={this._copyToClipboard}
					onLongPress={this._share}
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				/>

				<Text>Raw JSON:</Text>

				{googleResponse && (
					<Text
						onPress={this._copyToClipboard}
						onLongPress={this._share}
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
					>
						{JSON.stringify(googleResponse.responses)}
					</Text>
				)}
			</View>
		);
  };
  _keyExtractor = (item, index) => item.id;

	_renderItem = item => {
		<Text>response: {JSON.stringify(item)}</Text>;
	};

	_share = () => {
		Share.share({
			message: JSON.stringify(this.state.googleResponse.responses),
			title: 'Check it out',
			url: this.state.image
		});
	};

	_copyToClipboard = () => {
		Clipboard.setString(this.state.image);
		alert('Copied to clipboard');
	};

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

	submitToGoogle = async () => {
		try {
			this.setState({ uploading: true });
			let { image } = this.state;
			let body = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 10 },
							{ type: 'LANDMARK_DETECTION', maxResults: 5 },
							{ type: 'FACE_DETECTION', maxResults: 5 },
							{ type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
							{ type: 'CROP_HINTS', maxResults: 5 },
							{ type: 'WEB_DETECTION', maxResults: 5 }
						],
						image: {
							source: {
								imageUri: image
							}
						}
					}
				]
			});
			let response = await fetch(
				"https://vision.googleapis.com/v1/images:annotate?key=" +
					Environment['GOOGLE_CLOUD_VISION_API_KEY'],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			let responseJson = await response.json();
			console.log(responseJson);
			this.setState({
				googleResponse: responseJson,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
	};
}

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			resolve(xhr.response);
		};
		xhr.onerror = function(e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	const ref = firebase
		.storage()
		.ref()
		.child(uuid.v4());
	const snapshot = await ref.put(blob);

	blob.close();

	return await snapshot.ref.getDownloadURL();
}
