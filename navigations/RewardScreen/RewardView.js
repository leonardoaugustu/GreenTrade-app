import React, { Component } from "react";
import { Text, View, FlatList} from "react-native";
import { Icon, ListItem } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";

export default class RewardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  renderItem = ({ item, index }) => (
    <ListItem
      Component={TouchableScale}
      leftAvatar={{ rounded: true, source: { uri: item.url }, size: "medium" }}
      title={`${item.firstName} ${item.lastName.substring(0, 1).toUpperCase()}.`}
      titleStyle={{ color: "black" }}
      subtitle={item.speciality}
      subtitleStyle={{ color: "black", fontSize: 14 }}
      rightElement={<Rating
        readonly={true}
        ratingCount={5}
        imageSize={18}
        startingValue={item.rating}
      />

      }

      rightSubtitle={item.location}
      rightSubtitleStyle={{ fontSize: 14, color: "black", alignSelf: "flex-start" }}
      chevron={true}
      bottomDivider={true}
      topDivider={true}
      onPress={() => this.toggleBeeProfileHandler(index)} />
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
                  <Text style={styles.textTitle}>Rewards</Text>
              </View>
              </View>
          </View>
        </SafeAreaView>
    );
  }
}