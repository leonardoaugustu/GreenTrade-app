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
	View,
	Button,
	TouchableOpacity
} from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import '@firebase/firestore';
import * as Permissions from 'expo-permissions';
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import Environment from '../../config/FireBaseConfig';
import firebase from '../../config/firebase';
import Wave from 'react-native-waveview';
import { Dialog } from 'react-native-simple-dialogs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const db = firebase.firestore();


export default class HomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			uploading: false,
			displayConfirmButton: false,
			googleResponse: null,
			totalEstimatedPoints: 0,
			dialogVisible: false,
			height: 0,
			maxPoints: 1000,
			percentage: null,
			user: {},
		};
	}
	
	toggleCamera = () => {
		this.setState({ dialogVisible: true })
	}
	_canceltoggle = () => {
		this.setState({ dialogVisible: false })
	}

	async componentDidMount() {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		await Permissions.askAsync(Permissions.CAMERA);
		try{
		  var db = firebase.firestore();

		  var user = db.collection("users").doc(firebase.auth().currentUser.uid);
            user.get().then(u => {
              if (u.exists) {
                 this.setState({user: u.data()});
                 console.log(this.state);
                }
            });	
	  
		  db.collection("recycled-items").get().then((querySnapshot) => {
			var sum = 0;
			var p = 0;
			querySnapshot.forEach((doc) => 
			{
	
			  if (doc.data().userId==firebase.auth().currentUser.uid && doc.data().Collected == false)
			  {   
				sum = sum + parseInt(doc.data().estimatedPoints);
			p = sum / this.state.maxPoint;
			h = p* wp('40%');
			//console.log(this.state.name + "is showing")
			this.setState({totalPoint: sum, percentage: p, height: h});
			this.props.getPoints(sum);
			console.log(this.props.points)
			console.log(parseInt(this.props.points)/this.state.maxPoint)
				}
			});
		this.getUserEstimatedPoints
		this.forceUpdate();
	}

	getUserEstimatedPoints() {
		try {
			db.collection("recycled-items")
				.where("collected", "==", false)
				.where("userId", "==", firebase.auth().currentUser.uid)
				.get().then((querySnapshot) => {
					let pointsSum = 0;
					querySnapshot.forEach((doc) => {
						pointsSum += doc.data().estimatedPoints;
						
					});
					let fillPercent = pointsSum / this.state.maxPointss;
					let fillHeight = fillPercent * wp('40%');
					this.setState({ totalEstimatedPoints: pointsSum, percentage: fillPercent, height: fillHeight });
				});
		}
		catch (error) {
			console.log(error);
		}
	}

	render() {
		let { image } = this.state;
		const currentUser = firebase.auth().currentUser && firebase.auth().currentUser.displayName;

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
					<View style={styles.welcomeWrapper}>
						<Text style={styles.welcomeTxt}>Welcome Back, {this.state.user.displayName}!</Text>
					</View>
					<View>
						{this.state.totalEstimatedPoints / this.state.maxPoints * 100 <= 80 ? (
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
									ref={(wave) => wave && wave.setWaterHeight(this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%'))}
									style={styles.waveBall}
									H={this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%')}
									waveParams={[
										{ A: 10, T: 260, fill: '#62c2ff' },
										{ A: 15, T: 220, fill: '#0087dc' },
										{ A: 20, T: 180, fill: '#1aa7ff' },
									]}
									animated={true}
								/>
								<Text style={styles.perText}>{parseFloat(this.state.totalEstimatedPoints / this.state.maxPoints).toFixed(2) * 100} %</Text>
								{/* </TouchableHighlight> */}
							</View>
						) : <View style={styles.waveContainer} >
								<Wave
									ref={(wave) => wave && wave.setWaterHeight(this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%'))}
									style={styles.waveBall}
									H={this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%')}
									waveParams={[
										{ A: 10, T: 260, fill: '#FF9F2E' },
										{ A: 15, T: 220, fill: '#F08200' },
										{ A: 20, T: 180, fill: '#B36100' },
									]}
									animated={true}
								/>
								<Text style={styles.perText}>{this.state.totalEstimatedPoints / this.state.maxPoints < 1 ? parseFloat(this.state.totalEstimatedPoints / this.state.maxPoints).toFixed(2) * 100 : 100} %</Text>
								{/* </TouchableHighlight> */}
							</View>}
					</View>
					<View style={styles.pointWrapper}>
						<Text style={styles.pointTxt}>{this.state.totalEstimatedPoints} {'estimated total points'.toUpperCase()}</Text>
					</View>
					<View style={styles.cameraWrapper}>
						<TouchableOpacity onPress={this.toggleCamera} style={styles.cameraImg}>
							<Image style={styles.cameraImg} source={require('../../assets/camera.png')} />
						</TouchableOpacity>
					</View>
					<View style={styles.dialogContainer}>
						<Dialog
							dialogStyle={styles.dialog}
							visible={this.state.dialogVisible}
						>
							<View style={styles.customDialog}>
								<TouchableOpacity onPress={this._pickImage}><Text style={styles.btnTxt}>Camera Roll</Text></TouchableOpacity>
								<TouchableOpacity onPress={this._takePhoto}><Text style={styles.btnTxt}>Take a photo</Text></TouchableOpacity>
								<TouchableOpacity onPress={this._canceltoggle}><Text style={styles.btnTxt}>Cancel</Text></TouchableOpacity>
							</View>
						</Dialog>
					</View>
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}>Capture Your Recyclables</Text>
						)}
					</View>
					<View style={styles.helpContainer}>
						{/* <FlatList
							data={this.state.googleResponse ? this.state.googleResponse.responses[0].labelAnnotations : null}
							extraData={this.state}
							keyExtractor={this._keyExtractor}
							renderItem={({ item }) => {
								// let Points;
								// switch (item.description) {
								// 	case "Plastic":
								// 		//this.props.addPoints(50)
								// 		alert(`Awsome, you get plastic!`);
								// 		break;
								// 	case "Metal":
								// 		//this.props.addPoints(70)
								// 		alert(`Awsome, you got metal!`);
								// 		break;
								// 	default:
								// 		break;

								// }
								// this.updatePoints()

								return <Text>Item: {item.description}</Text>
							}}

						/> */}
						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

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
		if (!image || !displayConfirmButton) {
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
					onPress={() => {
						this.submitToGoogle()
					}}
					title="Confirm!"
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
				{/* <Text
					onPress={this._copyToClipboard}
					onLongPress={this._share}
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				/> */}

				{/* <Text>Raw JSON:</Text> */}

				{/* {googleResponse && (
					<Text
						onPress={this._copyToClipboard}
						onLongPress={this._share}
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
					>
						{JSON.stringify(googleResponse.responses)}
					</Text>
				)} */}
			</View>
		);
	};

	// _share = () => {
	// 	Share.share({
	// 		message: JSON.stringify(this.state.googleResponse.responses),
	// 		title: 'Check it out',
	// 		url: this.state.image
	// 	});
	// };

	// _copyToClipboard = () => {
	// 	Clipboard.setString(this.state.image);
	// 	alert('Copied to clipboard');
	// };

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this.setState({ dialogVisible: false })
		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this.setState({ dialogVisible: false })
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
			// alert(JSON.stringify(responseJson));
			this.setState({
				googleResponse: responseJson,
				uploading: false
			});
			var newPoint = this.props.points + this.state.point;
			this.props.getPoints(newPoint)
			console.log(this.props.points)
			this.setState({isAdded: !this.state.isAdded})
		} catch (error) {
			console.log(error);
		}
	};
}

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
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

	const picURI = await ref.getDownloadURL()
	console.log(picURI)
	const user = firebase.auth().currentUser;

	db.collection("recycled-items").doc().set({
		createdAt: Date.now(),
		Collected: false,
		estimatedPoints: "50",
		imageUri: picURI,
		userId: user.uid
	})
		.then(function () {
			console.log("Document successfully written!");
		})
		.catch(function (error) {
			console.error("Error writing document: ", error);
		});


	return await snapshot.ref.getDownloadURL()


}