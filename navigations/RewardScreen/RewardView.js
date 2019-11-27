
import React from 'react';
import {View, Text, Image, 
    ScrollView, ActivityIndicator,
TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import SafeAreaView from "react-native-safe-area-view";
import styles from './styles';
import {Icon} from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TabBar } from 'react-native-tab-view';
import RewardList from '../../components/RewardList';
import RewardHistory from '../../components/RewardHistory';
import { connect } from 'react-redux';
import {sortRewards} from '../../actions/Rewards/actionCreators';

const RewardListRoute = () => <RewardList/>

const RewardHistoryRoute = () => <RewardHistory/>

class RewardView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUserPoint: {},
    };
    this.marginLeft = new Animated.Value(wp('10%'));

    // try {
    //   const currentUser = firebase.auth().currentUser && firebase.auth().currentUser.displayName;
    //   var db = firebase.firestore();
    //   db.collection("users").where("displayName", "==", currentUser).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       var userPoint = {
    //         point: doc.data().points
    //       };
    //       this.setState({ currentUserPoint: userPoint });
    //     });
    //   });
    // }
    // catch (error) {
    //   console.log(error);
    // }
  }
async componentDidMount() {
}

_handleIndexChange = index => {
     this.props.sortRewards(index)
}

_renderTabBar = props => {

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
             <Text style={styles.textTitle}>Rewards</Text>
         </View>
         </View>
     </View>
     <View style={styles.topContainer}>
     <Icon name='star' type='material-community' color='#FBDFAA' iconStyle={styles.starIcon}/>
     <Text style={styles.pointText}>500</Text>
     <Image resizeMethod="resize" source={{uri:'https://cdn.dribbble.com/users/1281708/screenshots/4676637/____dribbble.gif'}} style={styles.headerImg}/>
          <TabBar
          {...props}
          indicatorStyle={styles.indocator}
         style={styles.tabBar}
         tabStyle={styles.tab}
         labelStyle={[styles.tabText]}
         onTabPress={this._handleIndexChange}
        />
        
        </View>
        <ScrollView></ScrollView>
            </SafeAreaView>
    );
  };

  _renderScene = SceneMap({
    rewardList: RewardListRoute,
    rewardHistory: RewardHistoryRoute,
  });

    render() {

        return(
            <TabView
            navigationState={this.props.navigationState}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          >
          </TabView>
        );
    }
}

function mapStateToProps (state){
    return{
      navigationState: state.sortRewardsReducer,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        sortRewards: (index) => dispatch(sortRewards(index)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(RewardView);