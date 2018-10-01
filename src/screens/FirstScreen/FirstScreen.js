import React, { Component } from "react";
import {
    View,
    Picker,
    DatePickerAndroid,
    Text,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    KeyboardAvoidingView,ScrollView
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import { addUserInfo } from "../../store/actions/index";
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from "react-native-vector-icons/Ionicons";
class FirstScreen extends Component{

    constructor(props) {
        super(props);
       
    }
    
    state = {
        gender:[
            {
                label:"Female",
                value:1,
                selected:true
            },
            {
                label:"Male",
                value:0,
            }
        ],
        controls:{
            firstName: {
				
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            lastName:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            phonenumber:{
				value:"",
				valid: false,
				touched: false,
				validationRules: {
					onlyNumber: false,
					minLength: 10
				}
			},
            height:{
                    
                value:"5.0",
                
            },
            state:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            city:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            birthday:{
				value:"26-2-1995"
            },
            marriedStatus:{
                value:"0"
            },
            education:{
                value:"0"
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
            let gender = (this.state.gender[0].selected)?0:1
            let userData = 
            {
                firstName:this.state.controls.firstName.value,
                lastName:this.state.controls.lastName.value,
               // city:this.state.controls.city.value,
                //state: this.state.controls.state.value,
                phonenumber:this.state.controls.phonenumber.value,
                height:this.state.controls.height.value,
                gender:gender,
                birthday:this.state.controls.birthday.value,
                education:this.state.controls.education.value,
                marriedStatus:this.state.controls.marriedStatus.value
            }
            //this.props.onAddUserInfo(userData);
            this.props.navigator.push({
                screen: "FYP.SecondScreen",
                title: "About Your Place",
                passProps: {
                    userData: userData
                }
            });
		}
    }
    render(){
       
        let selectedButton = this.state.gender.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.gender[0].value;
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
                    <Picker.Item label="Gradute" value="Gradute" />
                    <Picker.Item label="Post Gradute" value="Post Graduate" />
                    <Picker.Item label="Less Than Graduate" value="Less Than Graduate" />
                    
                    
                </Picker>
            </View>
            
            <DefaultInput 
                value={this.state.controls.state.value} 
                placeholder="State" 
                onChangeText={val => this.updateInputState("state", val)}
            />
            <DefaultInput 
                Value={this.state.controls.city.value} 
                placeholder="City"
                onChangeText={val => this.updateInputState("city", val)}
            />
            {submitButton}
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
	
	return {
		isLoading: state.ui.isLoading,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onAddUserInfo: (userData) => dispatch(addUserInfo(userData)),
		//onLoginUser: () => dispatch(getUserLoginData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);