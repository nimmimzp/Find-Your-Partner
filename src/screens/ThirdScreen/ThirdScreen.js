import React, { Component } from "react";
import {
    ScrollView,
    View,
    Picker,
    Text,ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import { addUserInfo } from "../../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class ThirdScreen extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        controls:{
            religion:{
                    
                value:"Hindu",
            },
            motherTounge:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            caste:{
                    
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
        //console.log(this.props)

        let aboutReligion = {
            religion: this.state.controls.religion.value,
            motherTounge: this.state.controls.motherTounge.value,
            caste: this.state.controls.caste.value
        }
       // console.log(aboutReligion)
        this.props.onAddUserInfo(this.props.userData,this.props.userStateData,aboutReligion);
    }
    render(){
        let submitButton = <ButtonWithBackground color="#29aaf4" onPress={this.addBasicInfoOfUser} >Next</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        return(
            <ScrollView>
                <View>
                    <Text>Religion</Text>
                    <Picker
                        selectedValue={this.state.controls.religion.value}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                            return {
                                controls:{
                                    ...prevState.controls,
                                    religion:{
                                        value:itemValue
                                    }
                                }
                            }
                            
                            })}>
                        <Picker.Item label="Hindu" value="Hindu" />
                        <Picker.Item label="Muslim" value="Muslim" />
                        <Picker.Item label="Sikh" value="Sikh" />
                        <Picker.Item label="Christian" value="Christian" />
                        <Picker.Item label="Jain" value="Jain" />
                    </Picker>
                </View>
                 <DefaultInput 
                    value={this.state.controls.caste.value} 
                    placeholder="Caste" 
                    onChangeText={val => this.updateInputState("caste", val)}
                />
                <DefaultInput 
                    Value={this.state.controls.motherTounge.value} 
                    placeholder="Mother Tounge Like Hindi,English"
                    onChangeText={val => this.updateInputState("motherTounge", val)}
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
		onAddUserInfo: (userData,userStateData,userReligionData) => dispatch(addUserInfo(userData,userStateData,userReligionData)),
		//onLoginUser: () => dispatch(getUserLoginData())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ThirdScreen);