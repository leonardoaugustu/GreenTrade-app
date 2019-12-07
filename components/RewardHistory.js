import React, {Component} from "react";
import {
    View, Text, Image, Modal, TouchableHighlight, Alert, Button,
    ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {List, ListItem, Left, Body, Right} from 'native-base';
import {connect} from 'react-redux';
import {sortRewards} from '../actions/Rewards/actionCreators';
import {withNavigation, FlatList} from 'react-navigation';
import styles from '../navigations/RewardScreen/styles';
import firebase from "../config/firebase";
const db = firebase.firestore();

class RewardHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalVisible: false,
            selectedReward: {},
            isLoading: false,
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;
        //refresh screen on focus
        navigation.addListener('willFocus', async () => {
            // Load the list
            await this.loadRewards();
        });
        // TODO: FIX BUG
        // For some reason the tab views does not actually trigger navigation's willFocus
        await this.loadRewards();
    }

    loadRewards = async () => {
        this.setState({ isLoading: true });
        let querySnapshot = await db.collection(`users`).doc(firebase.auth().currentUser.uid).collection(`codes`).get(), codes = [];

        querySnapshot.forEach(docSnap => {
            codes.push(docSnap.data());
        });
        this.setState({ data: codes, isLoading: false });
    }

    renderStaticReward = ({item}) => (
        <ListItem style={styles.itemContainer} onPress={() => this.setModalVisible(true, item)}>
            <Left>
                <Image resizeMethod="resize" resizeMode='contain' style={styles.img} source={{uri: item.url}}/>
            </Left>
            <Body style={styles.body}>
                <Text style={styles.rewardNameTxt}>{item.brand}</Text>
                <Text style={styles.dateTxt}>{item.redeemDate}</Text>
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
            <View style={styles.scene}>
                <FlatList
                    //(b,a) => (a.orderedDate.toDate() > b.orderedDate.toDate()) - (a.orderedDate.toDate() < b.orderedDate.toDate() ))
                    data={this.state.data.sort()}
                    renderItem={this.renderStaticReward}
                    keyExtractor={item => item.code}
                    style={styles.listContainer}
                    refreshing={this.state.isLoading}
                    onRefresh={this.loadRewards}
                />
                <Modal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        // apparently I need this for hardware back button on android
                        this.setModalVisible(false)
                    }}>

                    <View style={{margin: 50}}>
                        <Image
                            style={{height: 250, margin: 10}}
                            resizeMode='contain'
                            source={{uri: this.state.selectedReward.url}}
                        />
                        <View style={{margin: 10}}>
                            <Text style={{fontSize: 17, textAlign: 'center'}}>
                                Code to redeem at store: <Text style={{fontWeight: 'bold'}}>{this.state.selectedReward.code}</Text>
                            </Text>
                        </View>
                        <Button
                            title="Got it"
                            onPress={() => this.setModalVisible(false)}
                        />
                    </View>
                </Modal>
            </View>
        );
    }

    setModalVisible(visible, selectedReward = {}) {
        this.setState({modalVisible: visible, selectedReward});
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
