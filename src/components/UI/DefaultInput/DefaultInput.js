import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
	<TextInput
		underlineColorAndroid="transparent"
		{...props}
		style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  	/>
);

const styles = StyleSheet.create({
	input: {
		width: "100%",
		borderWidth: 2,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		borderRightWidth:0,
		borderColor: "#b3110e",
		padding: 8,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 4,
		paddingHorizontal:10,
		backgroundColor:"#fff",
		fontSize:18,
		color:'#000'
	},
	invalid: {
		backgroundColor: '#f9c0c0',
		borderColor: "#b3110e"
  	}
});

export default defaultInput;