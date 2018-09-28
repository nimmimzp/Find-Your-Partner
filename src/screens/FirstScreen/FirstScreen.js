import React, { Component } from "react";
import {
    View,
    Picker,
	DatePickerAndroid,
	TouchableOpacity,
	Button,
	StyleSheet,
	ScrollView,
	Platform,
	Text,
	ActivityIndicator
} from "react-native";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import DeafultRadioButton from '../../components/UI/RadioButton/RadioButton';
import RadioGroup from 'react-native-radio-buttons-group';
class FirstScreen extends Component{

    state = {
        gender:[
            {
                label:"Female",
                value:1,
                selected:true
            },
            {
                label:"Male",
                value:0,
            }
        ],
        countryName: '',
        regionName: ''
    }

    componentDidMount() {
        var url = 'https://freegeoip.net/json/';
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            this.setState(prevState => {
               return{
                ...prevState,
              countryName: responseJson.country_name,
              regionName: responseJson.region_name
               } 
            });
          })
          .catch((error) => {
           //console.error(error);
          });
      }

    selectRadionButtonHandler = (data) => {
        this.setState((prevState,data) =>{
            return {
                ...prevState,
                data
            }
        })
    }
    render(){
        let selectedButton = this.state.gender.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.gender[0].value;
        
        return(
            <View>
            
            <DefaultInput placeholder="Enter Your First Name"/>
            <DefaultInput placeholder="Enter Your Last Name"/>
            <DefaultInput placeholder="Enter Your Phone Number" />
            <View >
               
                <RadioGroup radioButtons={this.state.gender} onPress={this.selectRadionButtonHandler} />
            </View>
            <View>
                <Text>Height</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="4.0" value="4.0" />
                    <Picker.Item label="4.1" value="4.1" />
                    <Picker.Item label="4.2" value="4.2" />
                    <Picker.Item label="4.3" value="4.3" />
                    <Picker.Item label="4.4" value="4.4" />
                    <Picker.Item label="4.5" value="4.5" />
                    <Picker.Item label="4.6" value="4.6" />
                    <Picker.Item label="4.7" value="4.7" />
                    <Picker.Item label="4.8" value="4.8" />
                    <Picker.Item label="4.9" value="4.9" />

                    <Picker.Item label="4.10" value="4.10" />
                    <Picker.Item label="4.11" value="4.11" />
                    <Picker.Item label="5.0" value="5.0" />
                    <Picker.Item label="5.1" value="5.1" />
                    <Picker.Item label="5.2" value="5.2" />
                    <Picker.Item label="5.3" value="5.3" />
                    <Picker.Item label="5.4" value="5.4" />
                    <Picker.Item label="5.5" value="5.5" />
                    <Picker.Item label="5.6" value="5.6" />
                    <Picker.Item label="5.7" value="5.7" />
                    <Picker.Item label="5.8" value="5.8" />
                    <Picker.Item label="5.9" value="5.9" />
                    <Picker.Item label="5.10" value="5.10" />
                    <Picker.Item label="5.11" value="5.11" />
                    <Picker.Item label="6.0" value="6.0" />
                    <Picker.Item label="6.1" value="6.1" />
                    <Picker.Item label="6.2" value="6.2" />
                    <Picker.Item label="6.3" value="6.3" />
                    <Picker.Item label="6.4" value="6.4" />
                    <Picker.Item label="6.5" value="6.5" />
                    <Picker.Item label="6.6" value="6.6" />
                </Picker>
            </View>
            <Text>Country: {this.state.countryName}</Text>
            <Text>Region: {this.state.regionName}</Text>
            </View>
        )
    }
}

export default FirstScreen;