import React, { Component } from "react";
import {
    ActivityIndicator,ScrollView,StyleSheet
} from "react-native";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import { connect } from "react-redux";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import {updateUser} from "../../store/actions/index";
class StateScreen extends Component{
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        console.ignoredYellowBox = ['Setting a timer' ];
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
        controls:{
            state:{
                    
                value:(this.props.userData[0].state)?this.props.userData[0].state:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            city:{
                    
                value:(this.props.userData[0].city)?this.props.userData[0].city:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            pincode:{
                value:(this.props.userData[0].pincode)?this.props.userData[0].pincode:"",
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

    updateUserInfo = () => {
        console.log('jhscged')
        let userUpdatedData = {
            state: this.state.controls.state.value,
            city: this.state.controls.city.value,
            pincode: this.state.controls.pincode.value,
            key: this.props.userData[0].key
        }
        this.props.updateUserInfo(userUpdatedData);
    }
    render() {
        let submitButton =  <ButtonWithBackground color="#dea732" onPress={this.updateUserInfo} >Update</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        return(
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <DefaultInput 
                    value={this.state.controls.state.value} 
                    placeholder="State" 
                    onChangeText={val => this.updateInputState("state", val)}
                />
                <DefaultInput 
                    value={this.state.controls.city.value} 
                    placeholder="City"
                    onChangeText={val => this.updateInputState("city", val)}
                />
                <DefaultInput 
                    value={this.state.controls.pincode.value} 
                    placeholder="Pincode"
                    onChangeText={val => this.updateInputState("pincode", val)}
                    keyboardType="numeric"
                />
                {submitButton}
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
    submitButton:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        color:"#600307"
    },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(StateScreen);
