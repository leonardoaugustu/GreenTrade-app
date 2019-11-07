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
        point: '80'
    },
    {
        id: '2',
        url: 'https://www.timhortons.com/ca/images/en/register-and-reload-tim-card.png',
        name: 'Tim Hortons Gift Card',
        point: '50'
    },
    {
        id: '3',
        url: 'https://i.pinimg.com/originals/c2/62/62/c26262b655129cd5991582a191d66b2b.png',
        name: " McDonald's Gift Card",
        point: '70'
    },
    {
        id: '4',
        url: 'https://i.ebayimg.com/images/g/9KEAAOSw-JJaV8wE/s-l300.png',
        name: " Burger King Gift Card",
        point: '100'
    }
];

class RewardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerUrl: ''
        };
    }

    renderItem = ({ item}) => (
        <ListItem style={styles.itemContainer} onPress={this.toggleReward} >
              <Left>
              <Image resizeMethod="resize" style={styles.img} source={{uri: item.url}}/>
              </Left>
              <Body style={styles.body}>
                <Text style={styles.rewardNameTxt}>{item.name}</Text>
                <Text style={styles.moreTxt}>View More</Text>
                <Icon name="keyboard-arrow-right" 
                        type='material'
                        iconStyle={styles.iconGo}
                        color="#c3c3c3"
                        />
                <Text style={styles.listPoint}>{item.point}</Text>
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
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        sortRewards: (index) => dispatch(sortRewards(index)),
    };
  }
  
  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RewardList));