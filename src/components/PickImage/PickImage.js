import React, { Component } from "react";
import {Platform, View, Image, Button, StyleSheet,Text  } from "react-native";
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  state ={
    pickedImaged: this.props.imageSource
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title:"Pick an image"}, res =>{
      if(res.didCancel){
        alert("user canceld")
      }else if (res.error){
        alert(res.error)
      }else{
        this.setState({
          pickedImaged:{uri:res.uri}
        })
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.state.pickedImaged} style={{width: 150, height: 150, borderRadius: 150/2,margin:10,}} />
        </View>       
        <View style={styles.button}>
          <Button title="Set Your Picture" style={styles.buttonStyle} onPress={this.pickImageHandler}>
            <Text>Set Your Picture</Text>
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      width: "100%",
      alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
  button: {
    margin: 30
  },
  // MainContainer:{
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: 5,
  //   paddingTop: 70
  // },
  previewImage: {
      width: "100%",
      height: "100%"
  },
  setPictureStyle:{
     backgroundColor:'#900612',
     color:'#900612',
     padding:5,
     margin:30,
  },
  buttonStyle:{
    backgroundColor:"#000"
  }
});
export default PickImage;