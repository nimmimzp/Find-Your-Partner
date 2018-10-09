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
import startTab from '../MainTabs/startMainTabs';
//import {} from "../Interests/SendInterests"
import {connect} from 'react-redux';
import {authLogout,allRequestUserSent} from "../../store/actions/index"
class SideDrawer extends Component {
  constructor(props) {
    super(props);
    rootNavigator = this.props.navigator
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity >
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
          <TouchableOpacity onPress={this.props.requestSent}>
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
          <TouchableOpacity onPress={this.props.onLogout}>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogout : () => dispatch(authLogout()),
    requestSent : () => dispatch(allRequestUserSent())
  }
}

export default connect(null,mapDispatchToProps)(SideDrawer);