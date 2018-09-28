import React,{Component} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const defaultRadioButton = props => (
	<RadioGroup radioButtons={props.radioButtons} 
    />
);

export default defaultRadioButton;