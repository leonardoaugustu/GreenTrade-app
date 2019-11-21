import React from "react";
import { createAppContainer} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import {Icon} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeView from "../navigations/HomeScreen/Container";
import RewardView from "../navigations/RewardScreen/RewardView";
import HistoryView from "../navigations/HistoryScreen/HistoryView";
import SplashView from "../navigations/SplashScreen/SplashView";
import SignInView from "../navigations/SignInScreen/SignInView";
import SignUpView from "../navigations/SignUpScreen/styles";
import TradePointlView from "../navigations/TradePointScreen/TradePointView";
import CollectorMapView from "../navigations/CollectMapScreen/container";
import CollectorPickupView from "../navigations/CollectorPickupLocationScreen/container";
import PaymentView from "../navigations/PaymentScreen/PaymentView";

const Tabs = createBottomTabNavigator(
  {
    History: {
        screen: HistoryView
    },
    Home: {
      screen: HomeView 
    },
    Reward: {
        screen: RewardView
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        let iconColor;

        switch(routeName){
            case 'Home':
                iconName = `home${focused ? '' : '-outline'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
            case 'History':
                iconName = `${focused ? 'clock' : 'history'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
            case 'Reward':
                iconName = `star${focused ? '' : '-outline'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={wp('5%')} color={iconColor} type='material-community'/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1F9AFC',
      inactiveTintColor: '#87D5FA',
    },
  }
);

const StackNavigator = createStackNavigator({
  Home:{
    screen: Tabs
  },
  Splash: {
      screen: SplashView
  },
  SignIn: {
      screen: SignInView
  },
  SignUp: {
      screen: SignUpView
  },
  Reward: {
    screen: RewardView
},
  Trade: {
    screen: TradePointlView
  },
  CollectorMap: {
    screen: CollectorMapView
  },
  CollectorPickup: {
    screen: CollectorPickupView
  },
  Payment: {
    screen: PaymentView
  }
},
{
  headerMode: "none", //Hide the back button react navigation
  initialRouteName: "Splash",
});

//const navigation = createAppContainer(StackNavigator);

export default StackNavigator;