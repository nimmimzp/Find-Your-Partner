import React, { Component } from "react";


import DefaultInput from "../UI/DefaultInput/DefaultInput";

const lastName = props => (
  <DefaultInput
    placeholder="Your Last Name"
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
  />
);

export default lastName;