import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const buttonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text style={props.disabled ? styles.disabledText : styles.enabledText}>
        {props.children}
      </Text>
    </View>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
    borderWidth:0,
    borderColor: "black",
    color: "#dea732",
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 20,
  },
  disabled: {
    backgroundColor: "#dea732",
    borderColor: "#fff"
  },
  disabledText: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    color:"#600307"
  },
  enabledText:{
    fontWeight: 'bold',
    textAlign:'center',
    color:"#600307",
    fontSize: 20,
    padding: 0,
  }
});

export default buttonWithBackground;