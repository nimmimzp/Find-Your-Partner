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

import Icon from "react-native-vector-icons/Ionicons";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class SecondScreen extends Component{
    constructor(props) {
        super(props);
        
    }

    // componentDidMount(){
    //     console.log(this.props)
    // }
    state = {
        controls:{
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
            pincode:{
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
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
    
    addBasicInfoOfUser = () => {
        let newUserData = this.props.userData;
        newUserData.state= this.state.controls.state;
        newUserData.city= this.state.controls.city;
        newUserData.pincode= this.state.controls.pincode;
        console.log(newUserData);
        this.props.navigator.push({
            screen: "FYP.ThirdScreen",
            title: "About Your Religion",
            passProps: {
                userData: newUserData
            }
        });
    }
    render(){
        return(
            <ScrollView>
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
                <DefaultInput 
                    Value={this.state.controls.pincode.value} 
                    placeholder="Pincode"
                    onChangeText={val => this.updateInputState("pincode", val)}
                    keyboardType="numeric"
                />
                <ButtonWithBackground color="#29aaf4" onPress={this.addBasicInfoOfUser} >Next</ButtonWithBackground>
            </ScrollView>
        )
    }
}

export default SecondScreen;