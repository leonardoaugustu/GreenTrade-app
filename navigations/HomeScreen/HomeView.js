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
		this.getInitialPoints();

	toggleCamera = () => {
		this.setState({ dialogVisible: true })
	}

	_canceltoggle = () => {
		this.setState({ dialogVisible: false })
	}
	state = {
		image: null,
		uploading: false,
		googleResponse: null,
		points: 0,
		rewardPoint: 0,
		analyzed: false,
		dialogVisible: false,
		height: 0,
		totalPoint: 0,
		maxPoint: 1000,
		percentage: null,
		point: 50,
		isAdded: false,
		user: {},
	};
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
				this.props.points = this.props.points + parseInt(doc.data().estimatedPoints);
			p = sum / this.state.maxPoint;
			h = p* wp('40%');
			//console.log(this.state.name + "is showing")
			this.setState({totalPoint: sum, percentage: p, height: h});
			console.log(this.props.points)
			console.log(parseInt(this.props.points)/this.state.maxPoint)
				}
			  });
			});
			console.log(this.state.totalPoint)
		}
		catch (error) {
			console.log(error);
		}
	}

	async getInitialPoints() {
		firebase.database().ref('Users/').once('value', function (snapshot) {
			console.log(snapshot.val())
		});
		// db.collection('users').doc(doc.data().UserId).get().then((userDoc)=> {
		// 	this.props.getPoints(userDoc.data().points)
		// })
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
									H={this.state.point / this.state.maxPoints * wp('40%')}
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
						<Text style={styles.pointTxt}>{this.state.totalEstimatedPoints} {'total estimated points'.toUpperCase()}</Text>
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
								<Button
									onPress={this._pickImage}
									title="Choose from camera roll"
								/>
								<Button onPress={this._takePhoto} title="Take a photo" />
								<Button onPress={this._canceltoggle} title="Cancel" />
							</View>
						</Dialog>
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
					    <TouchableOpacity onPress={this._pickImage}><Text style={styles.btnTxt}>Choose from camera roll</Text></TouchableOpacity>
						<TouchableOpacity onPress={this._takePhoto}><Text style={styles.btnTxt}>Take a photo</Text></TouchableOpacity>
						<TouchableOpacity onPress={this._canceltoggle}><Text style={styles.btnTxt}>Cancel</Text></TouchableOpacity>
                       </View>
                </Dialog>
                </View>
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}>Find Your Recyclables</Text>
						)}
					</View>

					<View style={styles.helpContainer}>
						{/* <Button
							onPress={() => {
								this._pickImage()
								this.setState({ analyzed: !this.state.analyzed })
							}}
							title="Pick an image from camera roll"
						/>

						<Button style={styles.takePhoto} onPress={this._takePhoto} title="Take a photo" /> */}

						<FlatList
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

						/>

						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
					</View>
				</ScrollView>

			</SafeAreaView>
		);
	}

	organize = array => {
		return array.map(function (item, i) {
			return (
				<View key={i}>
					<Text>{item}</Text>
				</View>
			);
		});
	};
	// async updatePoints() {
	// 	const user = firebase.auth().currentUser;
	// 	let uid;
	// 	if (user != null) {
	// 		uid = user.uid;
	// 		const db = firebase.firestore();
	// 		const docRef = db.collection('users').doc(uid);
	// 		docRef.update({
	// 			points: this.props.rewardPoints

	// 		});

	// 	}
	// }


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
					onPress={() => {
						this.submitToGoogle()
					}}
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
			this.setState({ totalEstimatedPoints: this.state.totalEstimatedPoints + 50 })
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
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		collected: false,
		estimatedPoints: 50,
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
