import React , {Component} from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import PickImage from '../../components/PickImage/PickImage';
import { connect } from "react-redux";

import {updateProfile,addPlace} from '../../store/actions/index';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class UploadProfile extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
    }

    state = {
		controls: {
            image:{
                value:""
            }
        }
    }
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
    
    addUserProfile = () => {
        this.props.onAddUserProfileImage(
            
            
            this.state.controls.image.value,
            
            this.props.userId
        )
    }
    render (){
        let submitButton = <ButtonWithBackground color="#dea732" onPress={this.addUserProfile} >Save</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        return (
            <View style={styles.container}>
                <View style={styles.pickImageBox}>
                   <PickImage onImagePicked={this.imagePickHandler}/>
                </View>
                <View style={styles.saveBtn}> 
                   {submitButton} 
                </View>
            </View>
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
        onAddUserProfileImage: (image,userId) => dispatch(updateProfile(image,userId)),
        //onAddUserProfileImage: (first,image,last,birth,userId) => dispatch(addPlace(first,image,last,birth,userId))
		//onLoginUser: () => dispatch(getUserLoginData())
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(UploadProfile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
    },
    pickImageBox:{
        alignItems:"center",
        flexGrow: 1,
        justifyContent:"center",
    },
    saveBtn:{
        width:"100%"
    },
    previewImage: {
		width: "100%",
		height: "100%"
	}
})