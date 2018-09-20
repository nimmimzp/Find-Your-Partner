import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const phoneInput = props => (
	<DefaultInput
		placeholder="Phone Number"
		value={props.contactData.value}
		valid={props.contactData.valid}
		touched={props.contactData.touched}
        onChangeText={props.onChangeText}
        keyboardType="numeric"
	/>
);

export default phoneInput;