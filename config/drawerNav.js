import React from "react";
import { Image, SafeAreaView, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import  { createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import { Divider, Icon } from "react-native-elements";
import styles from "../navigations/HomeScreen/styles";
import HomeView from "../navigations/HomeScreen/HomeView";
import StackNavigator from"./navigation";
import CollectorPickupView from "../navigations/CollectorPickupLocationScreen/CollectorPickupView";

const DrawerComponent = (props) => (
    <SafeAreaView style={styles.menuContainer}>
        <View style={styles.profileContainer}>
            <Image
                source={{uri:'https://us.123rf.com/450wm/gmast3r/gmast3r1909/gmast3r190900039/129397458-man-wearing-protective-face-mask-with-human-putting-rubbish-into-trash-bin-environment-protection-re.jpg?ver=6'}}
                style={styles.profileImg}
            />
            <Text style={styles.nameTxt}>Sylvia Chen</Text>
            <Text style={styles.emailTxt}>sylviachen627@gmail.com</Text>
            </View>
            <View style={styles.safeView}>
          <View style={styles.DrawerComponentScrollView}>
            <DrawerNavigatorItems style={styles.menuItem}  {...props} />
            </View>
        </View>
    </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: StackNavigator, navigationOptions: {
                drawerLabel: "Home",
                drawerIcon: <Icon type="font-awesome" name="home" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        EditProfile: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Edit Profile",
                drawerIcon: <Icon type="material-community" name="account-box-multiple" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        Tutorial: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Tutorial",
                drawerIcon: <Icon type="material-community" name="cellphone" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        Notifications: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Notifications",
                drawerIcon: <Icon type="material-community" name="bell" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        InviteFriends: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Invite Friends",
                drawerIcon: <Icon type="material-community" name="account-plus" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        Settings: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Settings",
                drawerIcon: <Icon type="font-awesome" name="cog" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        Help: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Help",
                drawerIcon: <Icon type="font-awesome" name="question-circle" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
        LogOut: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Log Out",
                drawerIcon: <Icon type="material-community" name="keyboard-tab" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            }
        },
    },
    {
        contentComponent: DrawerComponent,
        drawerType: "slide",
        initialRouteName: "Home",
        
    }
);

// this.props.navigation.dispatch(DrawerActions.closeDrawer());
// this.props.navigation.dispatch(DrawerActions.openDrawer());

export default createAppContainer(DrawerNavigator);