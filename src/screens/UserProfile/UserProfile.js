import React, { Component } from 'react';
import { View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image } from 'react-native';
import { connect } from 'react-redux';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import { addPlace } from '../../store/actions/index';
import imagePlaceholder from "../../assets/beautiful-place.jpg";
class UserProfileScreen extends Component {
    
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
    }

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }
    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <View style={styles.placeholder}>
                        <Image source={imagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Pick Image" />
                    </View>
                    <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title="Locate Me" />
                    </View>
                    <DefaultInput placeholder="Place Name" />
                    <View style={styles.button}>
                        <Button title="Share the Place!" />
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
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(UserProfileScreen);
