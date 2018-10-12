import React, {Component} from 'react';
import { connect } from "react-redux";
import {Text} from "react-native";
import PlaceList from "../../components/PlaceList/PlaceList";
import {cancelIntrestRequest} from '../../store/actions/index';
class SendInterestScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };
    constructor(props) {
		super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };
    userSelectedHandler = (key) =>{
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        console.log(this.props.authUserKey)
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.firstName+' '+selPlace.lastName,
            passProps: {
                selectedPlace: selPlace,
                loggedinUser: this.props.authUserKey,
                buttonText:"Cancel Request",
                manageUserRequest:this.cancelRequest
            }
        });
    }

    cancelRequest = (requestedToDetail,requestByDetail,loggedinUser) => {
        this.props.cancelUserRequest(requestedToDetail,loggedinUser)
    }
    render () {
        if(this.props.allYourMatched.length == 0){
            return <Text> No Request send yet</Text>
        }
        return <PlaceList
        places={this.props.places}
        onItemSelected={this.userSelectedHandler}
      />
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelUserRequest: (requestedToDetail,loggedinUser) => dispatch(cancelIntrestRequest(requestedToDetail,loggedinUser))
    }
}
  
  

  
export default connect(null,mapDispatchToProps)(SendInterestScreen);