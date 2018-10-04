import React, { Component } from "react";
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
class ProfileScreen extends Component{
    state = {
        viewMode: "portrait"
    };
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View style={[styles.container,this.state.viewMode === "portrait"? styles.portraitContainer: styles.landscapeContainer]} >
				<View style={styles.subContainer}>
					<View>
						<Text style={styles.placeName}>
							Name:<Text>{this.props.userData[0].firstName+' '+ this.props.userData[0].lastName} </Text>
						</Text>
						<Text style={styles.placeName}>
							Birthday:{this.props.userData[0].birthday}
						</Text>
						<Text style={styles.placeName}>
							Height:{this.props.userData[0].height}
						</Text>
						<Text style={styles.placeName}>
							Gender:<Icon size={30} name={this.props.userData[0].gender ? "md-man" : "md-woman"}	/>
						</Text>
						<Text style={styles.placeName}>
							Married Status:{this.props.userData[0].marriedStatus?'Divorced':"Never Married"}
						</Text>
						<Text style={styles.placeName}>
							Highst Education:{this.props.userData[0].education}
						</Text>
					</View>
					<View>
						<TouchableOpacity >
							<View style={styles.deleteButton}>
								<Icon size={30}	name={Platform.OS === "android" ? "md-create" : "ios-create-outline"} color="orange" />
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