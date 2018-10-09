import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { requestUser } from "../../store/actions/index";
import  ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait"
  };

  constructor(props) {
    super(props);
    console.log(props)
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  addUserRequest = () => {
    //let requstedArray = [];
    let requestedToDetail = {
      requestedUser:this.props.selectedPlace.key,
      status:0,
    }
     let requestByDetail = {
       requestByDetailId:this.props.loggedinUser,
       status:0
     }
    //requstedArray.push(userDetail);
    this.props.addUserRequest(requestedToDetail,requestByDetail,this.props.loggedinUser);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
      <View style = { styles.MainContainer }>
        <Image source={this.props.selectedPlace.image} style={{width: 150, height: 150, borderRadius: 150/2}} />
      </View> 
        
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              Name:{this.props.selectedPlace.firstName+' '+this.props.selectedPlace.lastName}
            </Text>
            
            <Text style={styles.placeName}>
              Birthday:{this.props.selectedPlace.birthday}
            </Text>
            <Text style={styles.placeName}>
              Height:{this.props.selectedPlace.height}
            </Text>
            <Text style={styles.placeName}>
              Married Status:{this.props.selectedPlace.marriedStatus}
            </Text>
            <Text style={styles.placeName}>
              Education:{this.props.selectedPlace.education}
            </Text>
            <Text style={styles.placeName}>
              State:{this.props.selectedPlace.state}
            </Text>
            <Text style={styles.placeName}>
              City:{this.props.selectedPlace.city}
            </Text>
            <Text style={styles.placeName}>
              Religion:{this.props.selectedPlace.religion}
            </Text>
            <Text style={styles.placeName}>
              Caste:{this.props.selectedPlace.caste}
            </Text>
            <Text style={styles.placeName}>
              Mother Tounge:{this.props.selectedPlace.motherTounge}
            </Text>
          </View>
          <View>
          <ButtonWithBackground  color="#29aaf4" onPress={this.addUserRequest}>Send Intrest</ButtonWithBackground>
            {/* <TouchableOpacity onPress={this.addUserRequest}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-person-add" : "ios-person-add"}
                  color="orange"
                />
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    justifyContent:"space-evenly"
  },
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    
    textAlign: "center",
    fontSize: 14
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addUserRequest: (requestedToDetail,requestByDetail,loggedinUser) => dispatch(requestUser(requestedToDetail,requestByDetail,loggedinUser))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);