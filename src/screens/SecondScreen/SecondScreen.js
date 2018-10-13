import React, { Component } from "react";
import {
   ScrollView,
   StyleSheet
} from "react-native";

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class SecondScreen extends Component{
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
    }
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
        let newUserData ={
            state:this.state.controls.state.value,
            city:this.state.controls.city.value,
            pincode:this.state.controls.pincode.value
        };
        this.props.navigator.push({
            screen: "FYP.ThirdScreen",
            title: "About Your Religion",
            passProps: {
                userData: this.props.userData,
                userStateData: newUserData
            }
        });
      //  console.log(newUserData);
    }
    render(){
        return(
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
                 <ButtonWithBackground color="#dea732" onPress={this.addBasicInfoOfUser} >Next</ButtonWithBackground>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    contentContainer: {
        padding:20,
        backgroundColor:"#fff",
        textAlign:'left'
     },
});

export default SecondScreen;