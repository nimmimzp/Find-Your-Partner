import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";
import LastName from '../../components/PlaceInput/LastName';
import { addPlace } from "../../store/actions/index";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PickImage from "../../components/PickImage/PickImage";
//import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    controls: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      image:{
        value:null,
        valid: false
      },
      lastName:{
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  };

  constructor(props) {
    super(props);
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

  updateInputState = (key,val) =>{
    this.setState(prevState => {
      return {
        controls:{
          ...prevState.controls,
          [key]:{
            ...prevState.controls[key],
            value: val,
            valid: validate(val, prevState.controls[key].validationRules),
            touched: true
          }
        }
      }
    });
  }

  placeAddedHandler = () => {
    if (this.state.controls.firstName.value.trim() !== "") {
      this.props.onAddPlace(
        this.state.controls.firstName.value,
        this.state.controls.image.value,
        this.state.controls.lastName.value,
      );
     
    }
  };

  imagePickHandler = image=> {
    this.setState(prevState =>{
      return{
        controls:{
          ...prevState.controls,
          image:{
            value:image,
            valid:true
          }

        }
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Your Profile</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickHandler}/>
         
          <PlaceInput
            placeData={this.state.controls.firstName}
            onChangeText={val => this.updateInputState("firstName", val)}
          />
          <LastName placeData={this.state.controls.lastName} onChangeText={val => this.updateInputState("lastName", val)}/>
          <View style={styles.button}>
            <Button
              title="Save Your Info"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.firstName.valid ||
                !this.state.controls.lastName.valid ||
                !this.state.controls.image.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (firstName,image,lastName) => dispatch(addPlace(firstName,image,lastName))
  };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);