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
import { updateUser } from "../../store/actions/index";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";

class ReligionScreen extends Component{
   
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        controls:{
            religion:{
                    
                value:this.props.userData[0].religion?this.props.userData[0].religion:"Hindu",
            },
            motherTounge:{  
                value:this.props.userData[0].motherTounge?this.props.userData[0].motherTounge:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            caste:{ 
                value:this.props.userData[0].caste?this.props.userData[0].caste:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
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
    updateUserInfo = () => {

        let userUpdatedData = {
            religion: this.state.controls.religion.value,
            motherTounge: this.state.controls.motherTounge.value,
            caste: this.state.controls.caste.value,
            key: this.props.userData[0].key
        }
        this.props.updateUserInfo(userUpdatedData);
    }
    render() {
        let submitButton = <ButtonWithBackground color="#29aaf4" onPress={this.updateUserInfo} >Update</ButtonWithBackground>
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
                    value={this.state.controls.motherTounge.value} 
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
		updateUserInfo: (userData) => dispatch(updateUser(userData)),
		//onLoginUser: () => dispatch(getUserLoginData())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ReligionScreen);

