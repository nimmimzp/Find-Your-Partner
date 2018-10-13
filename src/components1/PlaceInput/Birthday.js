import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const birthDayInput = props => (
    <DefaultInput placeholder="Birthday" value={props.birthdayData.value} />
);

export default birthDayInput;