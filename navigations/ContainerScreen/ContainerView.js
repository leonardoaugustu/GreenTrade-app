import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { List, ListItem, Icon, Image } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import 'firebase/firestore';
import firebase from '../../config/firebase'

export default class ContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerData: [],
      loading: true
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    // refresh screen after purchasing new containers
    navigation.addListener('willFocus', () => {
      this.fetchData();
    });
  }

  fetchData() {
    try {
      const newData = [];
      var db = firebase.firestore();

      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection('containers')
        .get().then((snapshot) => {
          if (snapshot.empty) {
            this.setState({ loading: false});
          }
          snapshot.forEach((doc) => {
            db.collection('containers').doc(doc.id)
              .get().then((container) => {

                var containerInfo =
                {
                  "Name": container.data().name,
                  "Img_url": container.data().img_url,
                  "Amount": doc.data().amount,
                  "OrderedDate": doc.data().orderedDate
                };
                newData.push(containerInfo);
                this.setState({ containerData: newData, loading: false});

              });
          });
        });
    }
    catch (error) {
      console.log(error);
    }    
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#828282",
        }}
      />
    );
  };

  renderEmptyList = () => {
    return (
      <Text style={styles.displayMessage}>No Containers</Text>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      leftAvatar={{ source: { uri: item.Img_url } }}
      title={item.Name}
      subtitle={'Amount: ' + item.Amount}
      rightSubtitle={'Ordered: ' + new Date(item.OrderedDate).toISOString().slice(0, 10)}
    />
  );

  render() {
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
              <Text style={styles.textTitle}>Containers</Text>
            </View>
          </View>
        </View>

        {this.state.loading ?
          <ActivityIndicator size="large" style={{flex: 1}} />
          :
          <View style={styles.container}>
            <View style={styles.displayBox}>
              <Text style={styles.displayText}>List of Containers</Text>
            </View>

            <FlatList
              style={styles.list}
              data={this.state.containerData}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={this.renderItem}
              keyExtractor={item => item.Name}
              extraData={this.state}
              removeClippedSubviews={false}
              ListEmptyComponent={this.renderEmptyList}
            />
          </View>
        }

      </SafeAreaView>
    );
  }
}
