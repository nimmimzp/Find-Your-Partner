import React, { Component } from "react";
import {Platform, View, Image, Button, StyleSheet } from "react-native";
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
        <View style = { styles.MainContainer }>
          <Image source={this.state.pickedImaged} style={{width: 150, height: 150, borderRadius: 150/2}} />
        </View>       
        <View style={styles.button}>
          <Button title="Set Your Picture" onPress={this.pickImageHandler} />
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
      margin: 8
    },
    MainContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
  });

export default PickImage;