import React, { Component } from "react";
import {
    View,
    Picker,
    DatePickerAndroid,
    Text,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Image  from '../../assets/beautiful-place.jpg';
import Icon from "react-native-vector-icons/Ionicons";
class ProfileScreen extends Component{
    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        
    }
    render(){
        return(
            <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
      {/* <View style = { styles.MainContainer }>
            <Image source={Image} style={{width: 150, height: 150, borderRadius: 150/2}} />
        </View>  */}
        
        <View style={styles.subContainer}>
        
          <View>
            <Text style={styles.placeName}>
              Name:{this.props.userData.firstName+' '+ this.props.userData.lastName} 
            </Text>
           
            <Text style={styles.placeName}>
              Birthday:{this.props.userData.birthday}
            </Text>
            <Text style={styles.placeName}>
              Height:{this.props.userData.height}
            </Text>
            <Text style={styles.placeName}>
              Gender:<Icon
                  size={30}
                  name={this.props.userData.gender ? "md-man" : "md-woman"}
                  
                />
            </Text>
            <Text style={styles.placeName}>
              Married Status:{this.props.userData.marriedStatus?'Divorced':"Never Married"}
            </Text>
            <Text style={styles.placeName}>
              Highst Education:{this.props.userData.education?'Post Graduate':'Graduate'}
            </Text>
            <Text style={styles.placeName}>
              State:{this.props.userData.state}
            </Text>
            <Text style={styles.placeName}>
              City:{this.props.userData.city}
            </Text>
          </View>
          <View>
            <TouchableOpacity >
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-create" : "ios-create-outline"}
                  color="orange"
                />
              </View>
            </TouchableOpacity>
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
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
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
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 28
    },
    deleteButton: {
      alignItems: "center"
    },
    subContainer: {
      flex: 1
    }
  });

export default ProfileScreen