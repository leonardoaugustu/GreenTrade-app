import React, { Component } from "react";
import {View, Text, Image, 
    ScrollView,} from 'react-native';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {sortRewards} from '../actions/Rewards/actionCreators';
import { withNavigation } from 'react-navigation';
import styles from '../navigations/RewardScreen/styles';

class RewardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style={styles.scene}  >
            </ScrollView>
        );
    }
}

function mapStateToProps (state){
    return{
        // navigationState: state.sortCommunityReducer,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        sortRewards: (index) => dispatch(sortRewards(index)),
    };
  }
  
  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RewardList));