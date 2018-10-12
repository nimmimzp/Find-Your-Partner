import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Dimensions
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { requestUser } from "../../store/actions/index";
import  ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class MatchDetail extends Component {
	state = {
		viewMode: "portrait"
	};

	constructor(props) {
		super(props);
		console.log(props)
		console.ignoredYellowBox = ['Setting a timer' ];
		
	}
	render() {
		return (
            <ScrollView
            style={[
            styles.container,
            this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
            ]}
            >
                <View style = { styles.MainContainer }>
                    <Image source={this.props.selectedUser.image} style={{width: 150, height: 150, borderRadius: 150/2}} />
                </View> 

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            Name:{this.props.selectedUser.firstName+' '+this.props.selectedUser.lastName}
                        </Text>
                        <Text style={styles.placeName}>
                            Phone Number:{this.props.selectedUser.phonenumber}
                        </Text>
                        <Text style={styles.placeName}>
                            Birthday:{this.props.selectedUser.birthday}
                        </Text>
                        <Text style={styles.placeName}>
                            Height:{this.props.selectedUser.height}
                        </Text>
                        <Text style={styles.placeName}>
                            Married Status:{this.props.selectedUser.marriedStatus}
                        </Text>
                        <Text style={styles.placeName}>
                            Education:{this.props.selectedUser.education}
                        </Text>
                        <Text style={styles.placeName}>
                            State:{this.props.selectedUser.state}
                        </Text>
                        <Text style={styles.placeName}>
                            City:{this.props.selectedUser.city}
                        </Text>
                        <Text style={styles.placeName}>
                            Religion:{this.props.selectedUser.religion}
                        </Text>
                        <Text style={styles.placeName}>
                            Caste:{this.props.selectedUser.caste}
                        </Text>
                        <Text style={styles.placeName}>
                            Mother Tounge:{this.props.selectedUser.motherTounge}
                        </Text>
                    </View>  
                </View>
            </ScrollView>
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



export default (MatchDetail);