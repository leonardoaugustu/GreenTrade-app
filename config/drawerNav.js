import React, { Component } from "react";
import { Image, SafeAreaView, Text, View, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import  { createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions, StackActions } from 'react-navigation'
import { Divider, Icon } from "react-native-elements";
import styles from "../navigations/HomeScreen/styles";

import UserContainerSelectionView from "../navigations/UserContainerSelectionScreen/UserContainerSelectionView";

import StackNavigator from"./navigation";
import firebase from 'firebase';


import SplashView from "../navigations/SplashScreen/SplashView";
import SignInView from "../navigations/SignInScreen/SignInView";
import SignUpView from "../navigations/SignUpScreen/SignUpView";
import HomeView from "../navigations/HomeScreen/HomeView";
import CollectorPickupView from "../navigations/CollectorPickupLocationScreen/container";


class DrawerComponent extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		user: {},
    };
    componentDidMount() {
        try {
            const db = firebase.firestore();
            var user = db.collection("users").doc(firebase.auth().currentUser.uid);
            user.get().then(u => {
              if (u.exists) {
                 this.setState({user: u.data()});
                 console.log(this.state);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    filterMenuByUserRole = (items) => {
        console.log('>>> filtering drawerNav');
        return items.filter(i=>
            i.params && i.params.role && 
            (i.params.role.includes("*") ||
             i.params.role.includes(this.state.user.type))             
            );
    };
    onItemPress = (route, focused, props) => {
        console.log('onItemPress > route: ' + JSON.stringify(route) + ' focused: ' + focused);
        if(route.key == 'LogOut'){
            Alert.alert(
                'Log out', 'Do you want to logout?',
                [
                    { text: 'Cancel', onPress: () => { return null } },
                    {
                        text: 'Confirm', onPress: () => {
                            firebase.auth().signOut().then(function () {
                                console.info('Sign-out successful');
                                props.navigation.dispatch(DrawerActions.closeDrawer());
                                props.navigation.navigate('Splash');
                                
                            }).catch(function (error) {
                                console.error(error.message);
                            });
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            props.onItemPress({ route, focused });
        }
    };
    render() {
        const { items, ...props } = this.props;
        const menuItems = this.filterMenuByUserRole(items);

        return (
            <SafeAreaView style={styles.menuContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: firebase.auth().currentUser && firebase.auth().currentUser.providerData[0].photoURL ? firebase.auth().currentUser.providerData[0].photoURL : 'https://us.123rf.com/450wm/gmast3r/gmast3r1909/gmast3r190900039/129397458-man-wearing-protective-face-mask-with-human-putting-rubbish-into-trash-bin-environment-protection-re.jpg?ver=6' }}
                        style={styles.profileImg}
                    />
                    <Text style={styles.nameTxt}>{firebase.auth().currentUser && firebase.auth().currentUser.displayName}</Text>
                    <Text style={styles.emailTxt}>{firebase.auth().currentUser && firebase.auth().currentUser.providerData[0].email}</Text>
                </View>
                <View style={styles.safeView}>
                    <View style={styles.DrawerComponentScrollView}>
                        <DrawerNavigatorItems style={styles.menuItem}  {...props}
                            items={menuItems}
                            onItemPress={({ route, focused }) => this.onItemPress(route, focused, props)} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: StackNavigator, navigationOptions: {
                drawerLabel: "Home",
                drawerIcon: <Icon type="font-awesome" name="home" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['member', 'collector']}
        },
        EditProfile: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Edit Profile",
                drawerIcon: <Icon type="material-community" name="account-box-multiple" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            
            },
            params: {role: ['member', 'collector']}
        },
        Pickup: {
            screen: CollectorPickupView, navigationOptions: {
                drawerLabel: "Comfired Pickup",
                drawerIcon: <Icon type="material-community" name="cellphone" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['collector']}
        },
        Notifications: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Notifications",
                drawerIcon: <Icon type="material-community" name="bell" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['member', 'collector']}
        },
        InviteFriends: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Invite Friends",
                drawerIcon: <Icon type="material-community" name="account-plus" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['member', 'collector']}
        },
        Settings: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Settings",
                drawerIcon: <Icon type="font-awesome" name="cog" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['member', 'collector']}
        },
        Help: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Help",
                drawerIcon: <Icon type="font-awesome" name="question-circle" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['*']}
        },
        LogOut: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Log Out",
                drawerIcon: <Icon type="material-community" name="keyboard-tab" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['*']}
        },
    },
    {
        contentComponent: DrawerComponent,
        drawerType: "slide",
        initialRouteName: "Home",
    }
);

const AuthStack = createStackNavigator({
    SignIn: {
        screen: SignInView,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUp: SignUpView
});

export default createAppContainer(createSwitchNavigator(
  {
    Splash: SplashView,
    Auth: AuthStack,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'Splash'
  }
));