import React, { Component } from 'react';
import { View, Text,TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import startMainTabs from '../MainTabs/startMainTabs';
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import backGroundImage from "../../assets/background.jpeg";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    switchhadler = () =>{

    }
    render () {
        return (
            <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
                <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
            Switch to Login
          </ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your E-Mail Address" style={styles.input} />
                    <DefaultInput placeholder="Password" style={styles.input} />
                    <DefaultInput placeholder="Confirm Password" style={styles.input} />
                </View>
                <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    backgroundImage:{
        flex:1,
        width:"100%"
    }
});
export default AuthScreen;