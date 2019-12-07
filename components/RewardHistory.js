import React, { Component } from "react";
import {View, Text, Image, 
    ScrollView,} from 'react-native';
import {Icon} from 'react-native-elements';
import { List, ListItem, Left, Body, Right} from 'native-base';
import { connect } from 'react-redux';
import {sortRewards} from '../actions/Rewards/actionCreators';
import { withNavigation, FlatList } from 'react-navigation';
import styles from '../navigations/RewardScreen/styles';

const DATA = [
    {
        id: '1',
        url: 'https://app.starbucks.com/weblx/images/cards/card-and-stars.png',
        name: 'Starbucks Gift Card',
        redeemDate: '2019-11-02'
    },
];

class RewardHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderItem = ({ item}) => (
        <ListItem style={styles.itemContainer} onPress={this.toggleReward} >
              <Left>
              <Image resizeMethod="resize" style={styles.img} source={{uri: item.url}}/>
              </Left>
              <Body style={styles.body}>
                <Text style={styles.rewardNameTxt}>{item.name}</Text>
                <Text style={styles.dateTxt}>Redeem Date: {item.redeemDate}</Text>
                <Icon name="keyboard-arrow-right" 
                        type='material'
                        iconStyle={styles.iconAfterDate}
                        color="#c3c3c3"
                        />
              </Body>
            </ListItem>
      );

    render() {
        return (
            <ScrollView style={styles.scene}  >
            <FlatList
               data={DATA}
               renderItem={this.renderItem}
               keyExtractor={item => item.id}
               style={styles.listContainer}
            />
            </ScrollView>
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
  
  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RewardHistory));