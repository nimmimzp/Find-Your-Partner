import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {Text} from "react-native";
class AllMatchedIntrest extends Component {
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
       
        const selUser = this.props.allYourMatched.find(user => {
            return user.key === key;
        });
       
        this.props.navigator.push({
            screen: "FYP.AllMatchedDetailscreen",
            title: selUser.firstName+' '+selUser.lastName,
            passProps: {
                selectedUser: selUser,
                loggedinUser: this.props.authUserKey,
            }
        });
    }

    cancelRequest = (requestedToDetail,requestByDetail,loggedinUser) => {
        this.props.cancelUserRequest(requestedToDetail,loggedinUser)
    }
    render () {
        
        return <PlaceList
        places={this.props.allYourMatched}
        onItemSelected={this.userSelectedHandler}
      />
    }
}

  
  

  
export default AllMatchedIntrest;