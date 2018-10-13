import React, { Component } from "react";
import {
    ScrollView,
    View,
    Picker,
    StyleSheet,
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
        console.ignoredYellowBox = ['Setting a timer' ];
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
        let submitButton = <ButtonWithBackground color="#dea732" onPress={this.updateUserInfo} >Update</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        return(
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.selectpickerBox}>
                   <View style={{flex:2}}>
                      <Text style={styles.slectPickerText}>Religion</Text>
                    </View>
                    <View style={{flex:3,justifyContent: 'flex-end',alignItems:'flex-end'}}>
                    <Picker
                        selectedValue={this.state.controls.religion.value}
                        style={{width:130,height:35 }}
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
const styles = StyleSheet.create({
    contentContainer: {
        padding:20,
        backgroundColor:"#fff",
        textAlign:'left'
     },
     selectpickerBox:{
         flexDirection: 'row', 
         alignItems: 'center',
         backgroundColor:'#fff', 
         width: "100%",
         borderWidth: 2,
         borderLeftWidth: 0,
         borderTopWidth: 0,
         borderRightWidth:0,
         borderColor: "#b3110e",
         padding: 5,
         marginTop: 8,
         marginBottom: 8,
         borderRadius: 4,
         paddingHorizontal:10,
         color:'#000',
         fontWeight:'bold',
     },
     slectPickerText:{
        fontWeight:'bold',
        fontSize:16,
        color:'#000',
    },
    submitButton:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        color:"#600307"
    }
});
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

