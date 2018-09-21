import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import startTabBasedApp from '../MainTabs/startMainTabs';
class SideDrawer extends Component {
  constructor(props) {
    super(props);
  }
  userProfileHandler = () => {
    this.props.navigator.push({
      screen: "awesome-places.SharePlaceScreen"
      
    });
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity>
          <View style={styles.drawerItem}>
              <Icon
                name={Platform.OS === "android" ? "md-contact" : "ios-contact"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
              />
              <Text>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.userProfileHandler}>
            <View style={styles.drawerItem}>
              <Icon
                name={Platform.OS === "android" ? "md-contacts" : "ios-contacts"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
              />
              <Text>Friends</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.drawerItem}>
              <Icon
                name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
              />
              <Text>Sign Out</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    marginTop: 10
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default SideDrawer;