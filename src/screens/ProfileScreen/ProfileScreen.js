import React, { Component } from "react";
import {
    View,
    Picker,
    DatePickerAndroid,
    Text,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";

import RadioGroup from 'react-native-radio-buttons-group';
import Icon from "react-native-vector-icons/Ionicons";
import { updateUser } from "../../store/actions/index";

class ProfileScreen extends Component{
    static navigatorStyle = {
        navBarButtonColor: "orange"
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
    state = {
		viewMode: "portrait",
        gender:[
            {
                label:"Female",
                value:1,
                selected:(this.props.userData[0].gender)?true:false
            },
            {
                label:"Male",
				value:0,
				selected:(this.props.userData[0].gender)?false:true
            }
        ],
        controls:{
            firstName: {
				
                value:(this.props.userData[0].firstName)?this.props.userData[0].firstName:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            lastName:{
                    
                value:(this.props.userData[0].lastName)?this.props.userData[0].lastName:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            phonenumber:{
				value:(this.props.userData[0].phonenumber)?this.props.userData[0].phonenumber:"",
				valid: false,
				touched: false,
				validationRules: {
					onlyNumber: false,
					minLength: 10
				}
			},
            height:{
                    
                value:(this.props.userData[0].height)?this.props.userData[0].height:"5.0",
                
            },
            
            birthday:{
				value:(this.props.userData[0].birthday)?this.props.userData[0].birthday:"26-2-1995"
            },
            marriedStatus:{
                value:(this.props.userData[0].marriedStatus)?"Divorced":"Never Married"
            },
            education:{
                value:(this.props.userData[0].education)?this.props.userData[0].education:"Less Than Graduate"
            }
        }
	}
	
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

    selectRadionButtonHandler = (data) => {
        data[1].value = 1;
        this.setState((prevState,data) =>{
            return {
                ...prevState,
                data
            }
        })
    }

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
    addBasicInfoOfUser = () =>{
        if (this.state.controls.firstName.value.trim() !== "") {
            let gender = (this.state.gender[0].selected)?this.state.gender[0].value:this.state.gender[1].value;
            let userData = 
            {
                firstName:this.state.controls.firstName.value,
                lastName:this.state.controls.lastName.value,
                phonenumber:this.state.controls.phonenumber.value,
                height:this.state.controls.height.value,
                gender:gender,
                birthday:this.state.controls.birthday.value,
                education:this.state.controls.education.value,
				marriedStatus:this.state.controls.marriedStatus.value,
				key: this.props.userData[0].key
            }
            this.props.updateUserInfo(userData);
		}
    }
    render(){
        let selectedButton = this.state.gender.find(e => e.selected == true);
        
        
        let submitButton = <ButtonWithBackground color="#29aaf4" onPress={this.addBasicInfoOfUser} >Next</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        
        return(
			<ScrollView>
            
            <DefaultInput 
                value={this.state.controls.firstName.value} 
                placeholder="Enter Your First Name"
                onChangeText={val => this.updateInputState("firstName", val)}
            />
            <DefaultInput 
                value={this.state.controls.lastName.value} 
                placeholder="Enter Your Last Name"
                onChangeText={val => this.updateInputState("lastName", val)}
            />
            <DefaultInput 
                value={this.state.controls.phonenumber.value} 
                placeholder="Enter Your Phone Number"
                keyboardType="numeric"
                onChangeText={val => this.updateInputState("phonenumber", val)}
            />
            <View >
                <RadioGroup radioButtons={this.state.gender} onPress={this.selectRadionButtonHandler} />
            </View>
            <DefaultInput value={this.state.controls.birthday.value} editable = {false} />
            <TouchableOpacity onPress={()=>this.openAndroidDatePicker()}>
                <Icon size={30} name={Platform.OS === "android" ? "md-calendar" : "ios-calendar"} color="orange"/>
            </TouchableOpacity>
            <View>
                <Text>Height</Text>
                <Picker
                    selectedValue={this.state.controls.height.value}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                        return {
                            controls:{
                                ...prevState.controls,
                                height:{
                                    value:itemValue
                                }
                            }
                        }
                        
                        })}>
                    <Picker.Item label="<4.0" value="<4.0" />
                    <Picker.Item label="4.0" value="4.0" />
                    <Picker.Item label="4.1" value="4.1" />
                    <Picker.Item label="4.2" value="4.2" />
                    <Picker.Item label="4.3" value="4.3" />
                    <Picker.Item label="4.4" value="4.4" />
                    <Picker.Item label="4.5" value="4.5" />
                    <Picker.Item label="4.6" value="4.6" />
                    <Picker.Item label="4.7" value="4.7" />
                    <Picker.Item label="4.8" value="4.8" />
                    <Picker.Item label="4.9" value="4.9" />
                    <Picker.Item label="4.10" value="4.10" />
                    <Picker.Item label="4.11" value="4.11" />
                    <Picker.Item label="5.0" value="5.0" />
                    <Picker.Item label="5.1" value="5.1" />
                    <Picker.Item label="5.2" value="5.2" />
                    <Picker.Item label="5.3" value="5.3" />
                    <Picker.Item label="5.4" value="5.4" />
                    <Picker.Item label="5.5" value="5.5" />
                    <Picker.Item label="5.6" value="5.6" />
                    <Picker.Item label="5.7" value="5.7" />
                    <Picker.Item label="5.8" value="5.8" />
                    <Picker.Item label="5.9" value="5.9" />
                    <Picker.Item label="5.10" value="5.10" />
                    <Picker.Item label="5.11" value="5.11" />
                    <Picker.Item label="6.0" value="6.0" />
                    <Picker.Item label="6.1" value="6.1" />
                    <Picker.Item label="6.2" value="6.2" />
                    <Picker.Item label="6.3" value="6.3" />
                    <Picker.Item label="6.4" value="6.4" />
                    <Picker.Item label="6.5" value="6.5" />
                    <Picker.Item label="6.6" value="6.6" />
                    <Picker.Item label="> 6.6" value="> 6.6" />
                </Picker>
            </View>

            <View>
                <Text>Married Status</Text>
                <Picker
                    selectedValue={this.state.controls.marriedStatus.value}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                        return {
                            controls:{
                                ...prevState.controls,
                                marriedStatus:{
                                    value:itemValue
                                }
                            }
                        }
                        
                        })}>
                    <Picker.Item label="Never Married" value="0" />
                    <Picker.Item label="Divorced" value="1" />
                </Picker>
            </View>

            <View>
                <Text>Highest Education</Text>
                <Picker
                    selectedValue={this.state.controls.education.value}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                        return {
                            controls:{
                                ...prevState.controls,
                                education:{
                                    value:itemValue
                                }
                            }
                        }
                        
                        })}>
                    <Picker.Item label="Less Than Graduate" value="Less Than Graduate" />
                    <Picker.Item label="Gradute" value="Gradute" />
                    <Picker.Item label="Post Gradute" value="Post Graduate" />
                </Picker>
            </View>
            
            {/* z */}
            {submitButton}
            </ScrollView>
        );
    }
}

// const styles = StyleSheet.create({
//     MainContainer:{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       margin: 5,
//       paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
//     },
//     container: {
//       margin: 22,
//       flex: 1
//     },
//     portraitContainer: {
//       flexDirection: "column"
//     },
//     landscapeContainer: {
//       flexDirection: "row"
//     },
//     placeImage: {
//       width: "100%",
//       height: 200
//     },
//     placeName: {
//       fontWeight: "bold",
//       textAlign: "center",
//       fontSize: 28
//     },
//     deleteButton: {
//       alignItems: "center"
//     },
//     subContainer: {
//       flex: 1
//     }
//   });
  const mapStateToProps = state => {
	
	return {
		isLoading: state.ui.isLoading,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		updateUserInfo: (userData) => dispatch(updateUser(userData)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
 