import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { getPlaces,requestUser } from "../../store/actions/index";
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    console.log(props.places)
    console.ignoredYellowBox = ['Setting a timer' ];
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    console.log(this.props)
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });

    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace,
        loggedinUser: this.props.userData[0].key,
        buttonText:"Send Request",
        manageUserRequest:this.props.addUserRequest
      }
    });
  };

  componentDidMount() {
    let userData = {
      userId: this.props.userData[0].userId,
      userGender:this.props.userData[0].gender
    }
    this.props.onLoadPlaces(userData);
  }

  render() {
    
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Your Match</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim
          }}
        >
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});

const mapDispatchToProps = dispatch => {
  return{
    onLoadPlaces: (userData) => dispatch(getPlaces(userData)),
    addUserRequest: (requestedToDetail,requestByDetail,loggedinUser) => dispatch(requestUser(requestedToDetail,requestByDetail,loggedinUser))
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(FindPlaceScreen);
