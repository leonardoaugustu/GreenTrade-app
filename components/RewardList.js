import React, { Component } from "react";
import {View, Text, Image, 
    ScrollView, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import { List, ListItem, Left, Body, Right} from 'native-base';
import { connect } from 'react-redux';
import {sortRewards} from '../actions/Rewards/actionCreators';
import { withNavigation, FlatList } from 'react-navigation';
import styles from '../navigations/RewardScreen/styles';
import firebaseConfiguration from '../config/firebase';
import * as firebase from "firebase";

  firebase.initializeApp(firebaseConfiguration);

  let rewards = [];

class RewardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerUrl: '',
            loading: false,
            rewardList: [],
        };
    }

   async  componentWillMount(){
    try {
        await this.loadCollection();
        this.setState({rewardList: rewards});
      }
      catch (error){
        console.log(error);
      }
    }

   async loadCollection() {
        var db = firebase.firestore();
        db.collection("rewards").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var rewardInfo = {
                    "Name": doc.data().brand,
                    "Cost": doc.data().cost,
                    "Img_url": doc.data().img_url,
                    "Value": doc.data().value,
                    "Id": doc.data().id.toString(11)
                };
                rewards.push(rewardInfo);
                console.log(rewards);
            });
      });
    }

    _itemLayout(data, index) {
        const width = this._itemWidth()
    
        return {
          length: width,
          offset: width * index,
          index,
        };
      }
    
      _itemWidth() {
        const { width } = Dimensions.get("window");
        return width;
      }

    renderItem = ({ item}) => (
        <ListItem style={styles.itemContainer} onPress={this.toggleReward} >
              <Left>
              <Image resizeMethod="resize" style={styles.img} source={{uri: item.Img_url}}/>
              </Left>
              <Body style={styles.body}>
                <Text style={styles.rewardNameTxt}>{item.Name}</Text>
                <Text style={styles.moreTxt}>View More</Text>
                <Icon name="keyboard-arrow-right" 
                        type='material'
                        iconStyle={styles.iconGo}
                        color="#c3c3c3"
                        />
                <Text style={styles.listPoint}>{item.Cost}</Text>
              </Body>
            </ListItem>
      );

    render() {
        return (
            <View style={styles.scene}  >
            <FlatList
               data={rewards}
               renderItem={this.renderItem}
               keyExtractor={item => item.Id}
               style={styles.listContainer}
               extraData={rewards}
               getItemLayout={this._itemLayout.bind(this)}
               removeClippedSubviews={true}
            />
            </View>
        );
    }
}

function mapStateToProps (state){
    return{
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        sortRewards: (index) => dispatch(sortRewards(index)),
    };
  }
  
  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RewardList));