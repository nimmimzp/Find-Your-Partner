import React, { Component } from "react";
import {
	View,
	DatePickerAndroid,
	TouchableOpacity,
	Button,
	StyleSheet,
	ScrollView,
	Platform
} from "react-native";
import { connect } from "react-redux";
import LastName from '../../components/PlaceInput/LastName';
import { addPlace } from "../../store/actions/index";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import ContactInput from '../../components/PlaceInput/Contact';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PickImage from "../../components/PickImage/PickImage";
import validate from "../../utility/validation";
import BirthdayInput from '../../components/PlaceInput/Birthday';
import Icon from "react-native-vector-icons/Ionicons";
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
			},
			birthday:{
				value: "26-2-1995"
			},
			phonenumber:{
				value: "",
				valid: false,
				touched: false,
				
				validationRules: {
					onlyNumber: false,
					minLength: 10
				}
			}
		}
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}
	// Open calender 

	async openAndroidDatePicker() {
		//month start here 0 0-jan
		try {
			const {action, year,month,day} = await DatePickerAndroid.open({
				date: new Date(1995, 1, 26),
				maxDate: new Date()
			});
			if (action === DatePickerAndroid.dismissedAction) {
				return;
			}
			this.setState(prevState => {
				customMonth = parseInt(month)+1
				return {
					controls:{
						...prevState.controls,
						birthday:{
							value: day+'-'+customMonth+'-'+ year
						}
					}
				}
			})
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
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
				this.state.controls.birthday.value
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
				<ContactInput contactData={this.state.controls.phonenumber} onChangeText={val => this.updateInputState("phonenumber",val)} />
				<BirthdayInput birthdayData={this.state.controls.birthday} editable = {false} />
				<TouchableOpacity onPress={()=>this.openAndroidDatePicker()}>
					<Icon size={30} name={Platform.OS === "android" ? "md-calendar" : "ios-calendar"} color="orange"/>
				</TouchableOpacity>
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
		onAddPlace: (firstName,image,lastName,birthday) => dispatch(addPlace(firstName,image,lastName,birthday))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);